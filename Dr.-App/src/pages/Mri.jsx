import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const Mri = () => {
    const genAI = new GoogleGenerativeAI("AIzaSyCdVdYxncXdiIFIywI6FNyUWAH3S2Jsmgg");
    const [mriImage, setMRIImage] = useState('');
    const [imageInlineData, setImageInlineData] = useState('');
    const [aiAnalysis, setAiAnalysis] = useState({
        observations: '',
        abnormalities: '',
        assessment: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        if (aiAnalysis.observations || aiAnalysis.abnormalities || aiAnalysis.assessment) {
            animateText();
        }
    }, [aiAnalysis]);

    const animateText = () => {
        gsap.fromTo(".result-section", 
            { opacity: 0, y: 20 }, 
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.1
            }
        );
    };

    const parseAIResponse = (response) => {
        // Clean the response text first
        const cleanedText = response
            .replace(/\*\s+/g, '')
            .replace(/\*/g, '')
            .trim();
        
        // Parse the response into sections
        let observations = '';
        let abnormalities = '';
        let assessment = '';
        
        // Look for key observation section
        const observationMatch = cleanedText.match(/key observations:?(.+?)(?=potential abnormalities|abnormalities|general assessment|$)/is);
        if (observationMatch && observationMatch[1]) {
            observations = observationMatch[1].trim();
        }
        
        // Look for abnormalities section
        const abnormalitiesMatch = cleanedText.match(/(?:potential abnormalities|abnormalities):?(.+?)(?=general assessment|$)/is);
        if (abnormalitiesMatch && abnormalitiesMatch[1]) {
            abnormalities = abnormalitiesMatch[1].trim();
        }
        
        // Look for assessment section
        const assessmentMatch = cleanedText.match(/general assessment:?(.+?)$/is);
        if (assessmentMatch && assessmentMatch[1]) {
            assessment = assessmentMatch[1].trim();
        }
        
        return {
            observations,
            abnormalities,
            assessment
        };
    };

    async function analyzeMRIScan() {
        if (!imageInlineData) {
            setError("Please upload an MRI scan image.");
            return;
        }
        try {
            setLoading(true);
            setAiAnalysis({
                observations: '',
                abnormalities: '',
                assessment: ''
            });
            setError('');

            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
            const result = await model.generateContent([
                "You are a medical imaging expert. Analyze this MRI scan and provide a detailed report with EXACTLY these three sections clearly labeled:\n" +
                "1. Key observations\n" +
                "2. Potential abnormalities if any\n" +
                "3. General assessment\n\n" +
                "Format your response with these exact section headers. Be thorough but concise in each section." +
                imageInlineData
            ]);

            const response = await result.response;
            const text = await response.text();

            setAiAnalysis(parseAIResponse(text));
        } catch (error) {
            console.error('Error during MRI analysis:', error);
            setError("Error analyzing the MRI scan. Please try again or consult with a healthcare professional.");
        } finally {
            setLoading(false);
        }
    }

    const handleMRIUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.includes('image')) {
                setError('Please upload a valid image file.');
                return;
            }

            setUploadProgress(0);
            const uploadInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(uploadInterval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 100);

            getBase64(file)
                .then((result) => {
                    setMRIImage(result);
                    setError('');
                    clearInterval(uploadInterval);
                    setUploadProgress(100);
                })
                .catch(() => {
                    setError('Error processing the image.');
                    clearInterval(uploadInterval);
                });

            fileToGenerativePart(file).then((imageData) => {
                setImageInlineData(imageData);
            });
        }
    };

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }

    return (
        <>
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
                            <div className="loading-spinner mb-4"></div>
                            <p className="text-gray-700 font-semibold">Processing MRI Scan...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-gray-800 min-h-screen"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">MRI Scan Analysis</h1>
                        <p className="text-gray-600">
                            Upload an MRI scan image for AI-powered analysis
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-6 rounded-lg shadow-md mb-6"
                    >
                        <div className="flex flex-col items-center">
                            <motion.label
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full max-w-md flex flex-col items-center px-4 py-6 bg-gray-50 text-gray-500 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100"
                            >
                                <svg className="w-8 h-8 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="text-sm">Click to upload MRI </span>
                                <input type="file" className="hidden" onChange={handleMRIUpload} accept="image/*" />
                            </motion.label>

                            {uploadProgress > 0 && uploadProgress < 100 && (
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${uploadProgress}%` }}
                                    className="w-full max-w-md h-2 bg-blue-500 mt-4 rounded-full"
                                />
                            )}

                            {mriImage && (
                                <div className="mt-4 w-full max-w-md">
                                    <img 
                                        src={mriImage} 
                                        alt="Uploaded MRI scan" 
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={analyzeMRIScan}
                                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
                                disabled={!mriImage || loading}
                            >
                                {loading ? 'Analyzing...' : 'Analyze MRI Scan'}
                            </motion.button>
                        </div>
                    </motion.div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-center mb-6 bg-red-50 p-4 rounded-lg"
                        >
                            {error}
                        </motion.div>
                    )}

                    {(aiAnalysis.observations || aiAnalysis.abnormalities || aiAnalysis.assessment) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-lg shadow-md mb-6"
                        >
                            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Analysis Results</h2>
                            
                            <div className="grid md:grid-cols-3 gap-6">
                            <div className="result-section bg-blue-50 p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold mb-3 text-blue-700 border-b border-blue-200 pb-2">
                                        Key Observations
                                    </h3>
                                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                                        {aiAnalysis.observations.replace(/^\d+[\.\)]\s*/gm, '').replace(/\n\d+[\.\)]\s*/g, '\n')}
                                    </div>
                                </div>
                                
                                <div className="result-section bg-amber-50 p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold mb-3 text-amber-700 border-b border-amber-200 pb-2">
                                        Potential Abnormalities
                                    </h3>
                                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                                        {aiAnalysis.abnormalities.replace(/^\d+[\.\)]\s*/gm, '').replace(/\n\d+[\.\)]\s*/g, '\n')}
                                    </div>
                                </div>
                                
                                <div className="result-section bg-green-50 p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold mb-3 text-green-700 border-b border-green-200 pb-2">
                                        General Assessment
                                    </h3>
                                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                                        {aiAnalysis.assessment.replace(/^\d+[\.\)]\s*/gm, '').replace(/\n\d+[\.\)]\s*/g, '\n')}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-500 italic">
                                    This analysis is provided by AI and should be reviewed by a qualified medical professional.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            <style jsx>{`
                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .result-section {
                    transition: all 0.3s ease;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .result-section h3 {
                    flex-shrink: 0;
                }

                .result-section > div {
                    flex-grow: 1;
                    overflow-y: auto;
                    max-height: 300px;
                }

                .result-section:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }
            `}</style>
        </>
    );
};

export default Mri;