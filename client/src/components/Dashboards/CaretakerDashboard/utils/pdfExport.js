import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportPatientClinicalReport(
  patient,
  medications,
  logs,
  caregiverName = 'Jessica Reynolds, RN'
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor = [29, 78, 216]; // Blue 700
  const darkTextColor = [30, 41, 59]; // Slate 800
  const lightBg = [241, 245, 249]; // Slate 100

  // Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ElderCare Connect - Clinical Care Summary', 14, 13);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} | HIPAA & Medical Records Compliant`, 14, 21);

  // Patient Info Box
  doc.setFillColor(...lightBg);
  doc.roundedRect(14, 34, 182, 38, 3, 3, 'F');

  doc.setTextColor(...darkTextColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(patient.name, 18, 42);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Age: ${patient.age} yrs | Gender: ${patient.gender} | Blood Type: ${patient.bloodType}`, 18, 48);
  doc.text(`Residence: ${patient.roomOrAddress}`, 18, 54);
  doc.text(`Primary Diagnosis: ${patient.primaryCondition}`, 18, 60);
  doc.text(`Mobility: ${patient.mobilityLevel} | Overall Medication Adherence: ${patient.overallAdherenceRate}%`, 18, 66);

  // Doctor & Caregiver Column
  doc.text(`Assigned Caregiver: ${caregiverName}`, 115, 48);
  doc.text(`Primary Physician: ${patient.primaryDoctor.name} (${patient.primaryDoctor.specialty})`, 115, 54);
  doc.text(`Emergency Contact: ${patient.emergencyContacts[0]?.name || 'N/A'} - ${patient.emergencyContacts[0]?.phone || 'N/A'}`, 115, 60);
  doc.text(`Known Allergies: ${patient.allergies.join(', ') || 'None reported'}`, 115, 66);

  // Section 1: Active Medication Schedule
  let currentY = 78;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('1. Current Daily Medication Schedule', 14, currentY);

  const medRows = medications.map(m => [
    m.name,
    m.dosage,
    m.category,
    m.scheduleTime,
    m.frequency,
    m.instructions,
    m.takenToday ? 'Taken Today' : 'Pending'
  ]);

  autoTable(doc, {
    startY: currentY + 4,
    head: [['Medication', 'Dosage', 'Category', 'Time', 'Frequency', 'Clinical Instructions', 'Status']],
    body: medRows,
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 8,
      textColor: darkTextColor,
    },
    styles: {
      cellPadding: 2,
    },
    margin: { left: 14, right: 14 },
  });

  // Section 2: Recent Vitals & Mood Tracking
  currentY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 130;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('2. Wellness & Vital Trends (Last 7 Logs)', 14, currentY);

  const recentLogs = logs.slice(-7);
  const vitalsRows = recentLogs.map(log => [
    `${log.date} ${log.time}`,
    `${log.vitals.bloodPressureSystolic}/${log.vitals.bloodPressureDiastolic} mmHg`,
    `${log.vitals.heartRate} bpm`,
    `${log.vitals.bloodSugar} mg/dL`,
    `${log.vitals.oxygenLevel}%`,
    `${log.vitals.sleepHours} hrs`,
    `Pain: ${log.vitals.painLevel}/10`,
    log.mood.toUpperCase(),
    log.notes
  ]);

  autoTable(doc, {
    startY: currentY + 4,
    head: [['Date & Time', 'Blood Pressure', 'Pulse', 'Glucose', 'SpO2', 'Sleep', 'Pain', 'Mood', 'Caregiver Notes']],
    body: vitalsRows,
    theme: 'striped',
    headStyles: {
      fillColor: [59, 130, 246], // Blue 500
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: darkTextColor,
    },
    columnStyles: {
      8: { cellWidth: 45 },
    },
    styles: {
      cellPadding: 1.8,
    },
    margin: { left: 14, right: 14 },
  });

  // Section 3: Care Plan & Notes
  currentY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : 220;

  if (currentY > 240) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFillColor(...lightBg);
  doc.roundedRect(14, currentY, 182, 28, 2, 2, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('3. Care Plan Directives & Dietary Notes', 18, currentY + 6);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkTextColor);
  doc.text(`Directives: ${patient.carePlanNotes}`, 18, currentY + 12, { maxWidth: 174 });
  doc.text(`Dietary Restrictions: ${patient.dietaryRestrictions.join(' • ')}`, 18, currentY + 22);

  // Footer Signatures
  currentY += 34;
  if (currentY > 260) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Caretaker Signature: _______________________      Date: ______________', 14, currentY);
  doc.text('Physician Review Sign-off: _________________     Date: ______________', 110, currentY);

  const filename = `${patient.name.replace(/[^a-zA-Z0-9]/g, '_')}_Health_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
