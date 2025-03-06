import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaBrain,
  FaPills,
  FaNewspaper,
  FaHeartbeat,
  FaMicroscope,
  FaArrowRight,
} from "react-icons/fa";
import { MdHealthAndSafety, MdTrendingUp } from "react-icons/md";
import { BiChat } from "react-icons/bi";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function Landing() {
  // Features data
  const features = [
    {
      icon: <MdTrendingUp />,
      title: "Health Prediction",
      description:
        "Advanced AI algorithms to predict potential health risks and provide early warnings.",
      color: "blue",
      link: "/prediction",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      hoverColor: "hover:text-blue-700",
    },
    {
      icon: <FaPills />,
      title: "Medicine Delivery",
      description:
        "Order prescription medicines online with doorstep delivery and automatic refills.",
      color: "teal",
      link: "/medicine",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      hoverColor: "hover:text-teal-700",
    },
    {
      icon: <FaBrain />,
      title: "MRI Analysis",
      description: "AI-powered MRI scan analysis for quick and accurate diagnosis.",
      color: "purple",
      link: "/mri",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      hoverColor: "hover:text-purple-700",
    },
    {
      icon: <FaMicroscope />,
      title: "Medical Information",
      description:
        "Comprehensive database of medical conditions, symptoms, and treatments.",
      color: "rose",
      link: "/info",
      bgColor: "bg-rose-50",
      iconColor: "text-rose-600",
      hoverColor: "hover:text-rose-700",
    },
    {
      icon: <FaNewspaper />,
      title: "Health News",
      description:
        "Stay updated with the latest healthcare news, research, and medical breakthroughs.",
      color: "amber",
      link: "/news",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      hoverColor: "hover:text-amber-700",
    },
    {
      icon: <FaRobot />,
      title: "AI Health Assistant",
      description: "24/7 AI-powered chatbot for instant medical guidance and support.",
      color: "indigo",
      link: "/assistant",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      hoverColor: "hover:text-indigo-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Your Health, Our Priority
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Advanced AI-powered healthcare solutions at your fingertips
            </p>
            <motion.div
              className="flex justify-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <button className="bg-transparent border-2 border-slate-300 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300 transform hover:-translate-y-1">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-800">
            Comprehensive Healthcare Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div
                  className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6`}
                >
                  <div className={`text-3xl ${feature.iconColor}`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">
                  {feature.title}
                </h3>
                <p className="text-slate-600 mb-4">{feature.description}</p>
                <Link
                  to={feature.link}
                  className={`${feature.iconColor} ${feature.hoverColor} font-semibold flex items-center group`}
                >
                  Learn More
                  <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* AI Assistant Feature */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-r from-indigo-600 to-blue-500 py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                24/7 AI Healthcare Assistant
              </h2>
              <p className="text-xl mb-8 text-indigo-100">
                Get instant medical guidance, symptom assessment, and healthcare
                recommendations from our advanced AI assistant.
              </p>
              <div className="space-y-6">
                <motion.div
                  className="flex items-center gap-4 bg-white/10 p-4 rounded-lg"
                  whileHover={{ x: 10 }}
                >
                  <BiChat className="text-2xl text-indigo-200" />
                  <span className="text-indigo-100">Instant medical guidance</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-4 bg-white/10 p-4 rounded-lg"
                  whileHover={{ x: 10 }}
                >
                  <MdHealthAndSafety className="text-2xl text-indigo-200" />
                  <span className="text-indigo-100">Symptom assessment</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-4 bg-white/10 p-4 rounded-lg"
                  whileHover={{ x: 10 }}
                >
                  <FaHeartbeat className="text-2xl text-indigo-200" />
                  <span className="text-indigo-100">Health monitoring</span>
                </motion.div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-10 bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Try AI Assistant
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="hidden md:block"
            >
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-lg">
                <div className="space-y-4">
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="h-4 bg-white/20 rounded-full w-3/4"
                  ></motion.div>
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                    className="h-4 bg-white/20 rounded-full"
                  ></motion.div>
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1,
                    }}
                    className="h-4 bg-white/20 rounded-full w-5/6"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-slate-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100K+", label: "Users Served" },
              { number: "95%", label: "Accuracy Rate" },
              { number: "24/7", label: "AI Support" },
              { number: "50+", label: "Health Services" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-white rounded-2xl shadow-lg"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of users who trust our AI-powered healthcare platform
          </p>
          <motion.div
            className="flex justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
              Get Started Now
            </button>
            <button className="bg-transparent border-2 border-slate-300 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300 transform hover:-translate-y-1">
              Contact Us
            </button>
          </motion.div>
        </div>
      </motion.section>
    

      {/* Testimonials Section */}
      <motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="py-20 px-4 bg-white"
>
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-800">
      What Our Users Say
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          name: "Sarah Johnson",
          role: "Patient",
          content:
            "The AI health predictions have been incredibly accurate. It helped me identify early warning signs that I wouldn't have noticed otherwise.",
        },
        {
          name: "Dr. Michael Chen",
          role: "Healthcare Professional",
          content:
            "This platform has revolutionized how I interact with patients. The AI assistance helps streamline diagnoses and treatment plans.",
        },
        {
          name: "Emily Rodriguez",
          role: "Regular User",
          content:
            "The 24/7 AI chat support is amazing. I get instant answers to my health concerns, and the medicine delivery service is very convenient.",
        },
      ].map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          className="bg-slate-50 p-6 rounded-2xl shadow-lg"
        >
          <p className="text-slate-600 mb-4">{testimonial.content}</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
              {testimonial.name[0]}
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">
                {testimonial.name}
              </h4>
              <p className="text-slate-500 text-sm">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
      </motion.section>
    </div>
  );
}

export default Landing;