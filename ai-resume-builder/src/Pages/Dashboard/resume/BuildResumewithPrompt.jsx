import React, { useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, fontWeight: 'bold' },
  text: { fontSize: 12 }
});

const ResumePDF = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>{resume.name}</Text>
        <Text style={styles.text}>{resume.title}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Experience:</Text>
        {resume.experience.map((exp, index) => (
          <Text key={index} style={styles.text}>- {exp}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Skills:</Text>
        <Text style={styles.text}>{resume.skills.join(", ")}</Text>
      </View>
    </Page>
  </Document>
);

const ResumeBuilder = () => {
  const [prompt, setPrompt] = useState("");
  const [resume, setResume] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);

  const generateResume = async () => {
    const lines = prompt.split("\n");
    const name = lines.find(line => line.toLowerCase().startsWith("name:"))?.split(":")[1]?.trim() || "Unknown";
    const title = lines.find(line => line.toLowerCase().startsWith("title:"))?.split(":")[1]?.trim() || "N/A";
    const experience = lines.filter(line => line.toLowerCase().startsWith("experience:"))
      .map(line => line.split(":")[1].trim());
    const skills = lines.find(line => line.toLowerCase().startsWith("skills:"))?.split(":")[1]?.trim().split(",") || [];

    const resumeData = { name, title, experience, skills };
    setResume(resumeData);

    const blob = await pdf(<ResumePDF resume={resumeData} />).toBlob();
    setPdfBlob(blob);
  };

  const downloadResume = () => {
    if (pdfBlob) {
      saveAs(pdfBlob, "resume.pdf");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side: Input Section */}
      <div className="w-1/2 p-6 bg-white shadow-md overflow-auto">
        <h2 className="text-2xl font-bold mb-4">AI Resume Builder</h2>
        <textarea
          className="w-full p-3 border rounded-md"
          rows="10"
          placeholder="Enter resume details using the template..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button
          onClick={generateResume}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Generate Resume
        </button>
      </div>
      
      {/* Right Side: Resume Preview */}
      <div className="w-1/2 p-6 bg-gray-200 overflow-auto">
        {resume ? (
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold">{resume.name}</h2>
            <p className="text-gray-600">{resume.title}</p>
            <h3 className="mt-4 font-semibold">Experience:</h3>
            <ul className="list-disc list-inside">
              {resume.experience.map((exp, index) => (
                <li key={index}>{exp}</li>
              ))}
            </ul>
            <h3 className="mt-4 font-semibold">Skills:</h3>
            <p>{resume.skills.join(", ")}</p>
            <button
              onClick={downloadResume}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full"
            >
              Download Resume as PDF
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Enter details to generate a resume...</p>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
