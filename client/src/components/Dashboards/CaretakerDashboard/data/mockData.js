export const initialCaregiver = {
  id: 'cg-1',
  name: 'Jessica Reynolds, RN',
  role: 'Certified Senior Care Specialist',
  avatar: 'https://images.unsplash.com/photo-1594824813594-8025cb92d348?auto=format&fit=crop&q=80&w=256',
  monthlyRating: 4.9,
  visitsDoneThisMonth: 24,
  monthlyEarnings: 3420.50,
  phone: '+1 (555) 234-8901',
  email: 'jessica.reynolds@eldercareconnect.org',
  agency: 'ElderCare Connect Health Services',
};

export const initialPatients = [
  {
    id: 'p-1',
    name: 'Mr. Arthur Sterling',
    age: 78,
    gender: 'Male',
    roomOrAddress: '242 Maplewood Terrace, Apt 5B',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    bloodType: 'O+',
    primaryCondition: 'Hypertension & Type 2 Diabetes',
    conditions: ['Stage 1 Hypertension', 'Type 2 Diabetes Mellitus', 'Mild Osteoarthritis'],
    allergies: ['Penicillin', 'Sulfa Drugs'],
    primaryDoctor: {
      name: 'Dr. Robert Vance, MD',
      specialty: 'Cardiology & Geriatric Medicine',
      phone: '+1 (555) 443-1290',
      clinic: 'Saint Jude Senior Health Pavilion',
    },
    emergencyContacts: [
      {
        name: 'Sarah Sterling (Daughter)',
        relation: 'Daughter / Power of Attorney',
        phone: '+1 (555) 890-4321',
        email: 'sarah.sterling@example.com',
        isPrimary: true,
      },
      {
        name: 'Thomas Sterling (Son)',
        relation: 'Son',
        phone: '+1 (555) 890-4322',
        email: 'thomas.s@example.com',
        isPrimary: false,
      },
    ],
    carePlanNotes: 'Monitor postprandial glucose levels. Encourage gentle 15-minute morning walks. Ensure hydration and assist with compression stockings.',
    dietaryRestrictions: ['Low Sodium (<1500mg/day)', 'Diabetic Friendly (Controlled Carbs)'],
    mobilityLevel: 'Assisted Walking',
    assignedCaregiver: 'Jessica Reynolds, RN',
    currentMood: 'good',
    overallAdherenceRate: 94,
  },
  {
    id: 'p-2',
    name: 'Mrs. Evelyn Jenkins',
    age: 82,
    gender: 'Female',
    roomOrAddress: 'Room 402, Oakwood Assisted Living',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    bloodType: 'A+',
    primaryCondition: 'Fall Risk & Post-Stroke Recovery',
    conditions: ['History of TIA (Mild Stroke)', 'Osteoporosis', 'Fall Risk Level 3'],
    allergies: ['Aspirin (Mild Gastric Sensitivity)', 'Latex'],
    primaryDoctor: {
      name: 'Dr. Clara Hernandez, MD',
      specialty: 'Neurology',
      phone: '+1 (555) 321-7788',
      clinic: 'Oakwood Neurological Center',
    },
    emergencyContacts: [
      {
        name: 'David Jenkins (Son)',
        relation: 'Son',
        phone: '+1 (555) 678-9012',
        email: 'david.jenkins@workmail.com',
        isPrimary: true,
      },
    ],
    carePlanNotes: 'Wear anti-slip socks at all times. Bed alarm must remain active. Physical therapy exercises for left arm rehabilitation twice daily.',
    dietaryRestrictions: ['Soft Foods', 'High Calcium'],
    mobilityLevel: 'Wheelchair',
    assignedCaregiver: 'Jessica Reynolds, RN',
    currentMood: 'neutral',
    overallAdherenceRate: 88,
  },
  {
    id: 'p-3',
    name: 'Margaret Zhao',
    age: 74,
    gender: 'Female',
    roomOrAddress: '118 Pineview Manor, Suite 3A',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    bloodType: 'B+',
    primaryCondition: 'Post-Knee Replacement Rehab',
    conditions: ['Total Knee Arthroplasty (Right)', 'Mild Insomnia', 'Elevated Cholesterol'],
    allergies: ['Codeine'],
    primaryDoctor: {
      name: 'Dr. Marcus Webb, MD',
      specialty: 'Orthopedic Surgery',
      phone: '+1 (555) 789-0123',
      clinic: 'Metro Orthopedic Institute',
    },
    emergencyContacts: [
      {
        name: 'Kevin Zhao (Son)',
        relation: 'Son',
        phone: '+1 (555) 234-5678',
        email: 'kzhao@techhub.io',
        isPrimary: true,
      },
    ],
    carePlanNotes: 'Active range-of-motion knee flexion exercises 3x daily. Apply cold ice pack 20 mins post-exercise. Monitor surgical incision for redness.',
    dietaryRestrictions: ['Low Cholesterol', 'Anti-inflammatory diet'],
    mobilityLevel: 'Assisted Walking',
    assignedCaregiver: 'Jessica Reynolds, RN',
    currentMood: 'great',
    overallAdherenceRate: 98,
  },
  {
    id: 'p-4',
    name: 'Robert Chen',
    age: 80,
    gender: 'Male',
    roomOrAddress: '512 Cedar Crest Blvd, Unit 12',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256',
    bloodType: 'AB-',
    primaryCondition: 'Congestive Heart Failure (Mild)',
    conditions: ['CHF Stage B', 'Chronic Kidney Disease Stage 2', 'Gout'],
    allergies: ['NSAIDs (Ibuprofen/Naproxen)'],
    primaryDoctor: {
      name: 'Dr. Samantha Patel, MD',
      specialty: 'Cardiovascular Care',
      phone: '+1 (555) 901-2345',
      clinic: 'Heart & Vascular Associates',
    },
    emergencyContacts: [
      {
        name: 'Linda Chen (Spouse)',
        relation: 'Spouse',
        phone: '+1 (555) 345-6789',
        isPrimary: true,
      },
    ],
    carePlanNotes: 'Daily morning weight check before breakfast. Report weight gain > 3 lbs in 2 days immediately. Fluid restriction: 1.8 Liters/day.',
    dietaryRestrictions: ['Strict Low Sodium (<1200mg)', 'Fluid Restricted'],
    mobilityLevel: 'Independent',
    assignedCaregiver: 'Jessica Reynolds, RN',
    currentMood: 'good',
    overallAdherenceRate: 91,
  },
  {
    id: 'p-5',
    name: 'Eleanor Vance',
    age: 86,
    gender: 'Female',
    roomOrAddress: '780 Sunrise Valley Care, Room 108',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=256',
    bloodType: 'A-',
    primaryCondition: 'Mild Cognitive Impairment & Arthritis',
    conditions: ['MCI (Early Stage)', 'Osteoarthritis', 'Macular Degeneration'],
    allergies: ['Sulfa'],
    primaryDoctor: {
      name: 'Dr. Angela Rossi, MD',
      specialty: 'Geriatric Psychiatry',
      phone: '+1 (555) 654-3210',
      clinic: 'Silver Horizon Memory Clinic',
    },
    emergencyContacts: [
      {
        name: 'Emily Vance (Granddaughter)',
        relation: 'Granddaughter & Primary Caregiver',
        phone: '+1 (555) 456-7890',
        email: 'emily.vance@studio.org',
        isPrimary: true,
      },
    ],
    carePlanNotes: 'Use memory prompt cards for morning routine. Read together in the afternoon. Keep glasses and magnifying reader on bedside table.',
    dietaryRestrictions: ['Heart Healthy', 'High Fiber'],
    mobilityLevel: 'Assisted Walking',
    assignedCaregiver: 'Jessica Reynolds, RN',
    currentMood: 'neutral',
    overallAdherenceRate: 85,
  }
];

export const initialMedications = [
  // Arthur Sterling (p-1)
  {
    id: 'med-1',
    patientId: 'p-1',
    name: 'Lisinopril',
    dosage: '10mg',
    category: 'Blood Pressure',
    scheduleTime: '08:00 AM',
    frequency: 'Once daily (Morning)',
    instructions: 'Take with full glass of water. Do not skip if feeling well.',
    takenToday: true,
    takenTime: '08:15 AM',
    history: [
      { date: '2026-08-30', taken: true, time: '08:15 AM' },
      { date: '2026-08-29', taken: true, time: '08:05 AM' },
      { date: '2026-08-28', taken: true, time: '08:10 AM' },
      { date: '2026-08-27', taken: true, time: '08:20 AM' },
      { date: '2026-08-26', taken: true, time: '08:00 AM' },
      { date: '2026-08-25', taken: true, time: '08:30 AM' },
      { date: '2026-08-24', taken: true, time: '08:15 AM' },
    ],
  },
  {
    id: 'med-2',
    patientId: 'p-1',
    name: 'Metformin',
    dosage: '500mg',
    category: 'Diabetes',
    scheduleTime: '08:30 AM',
    frequency: 'Twice daily (Breakfast & Dinner)',
    instructions: 'Take immediately after meals to minimize stomach upset.',
    takenToday: true,
    takenTime: '08:45 AM',
    history: [
      { date: '2026-08-30', taken: true, time: '08:45 AM' },
      { date: '2026-08-29', taken: true, time: '08:40 AM' },
      { date: '2026-08-28', taken: true, time: '08:50 AM' },
      { date: '2026-08-27', taken: false, notes: 'Missed morning breakfast' },
      { date: '2026-08-26', taken: true, time: '08:40 AM' },
      { date: '2026-08-25', taken: true, time: '08:35 AM' },
      { date: '2026-08-24', taken: true, time: '08:45 AM' },
    ],
  },
  {
    id: 'med-3',
    patientId: 'p-1',
    name: 'Atorvastatin',
    dosage: '20mg',
    category: 'Cholesterol',
    scheduleTime: '08:00 PM',
    frequency: 'Once daily (Night)',
    instructions: 'Take before bedtime. Avoid grapefruit juice.',
    takenToday: false,
    history: [
      { date: '2026-08-29', taken: true, time: '08:10 PM' },
      { date: '2026-08-28', taken: true, time: '08:00 PM' },
      { date: '2026-08-27', taken: true, time: '08:15 PM' },
      { date: '2026-08-26', taken: true, time: '08:05 PM' },
    ],
  },
  {
    id: 'med-4',
    patientId: 'p-1',
    name: 'Vitamin D3 & Calcium',
    dosage: '1000 IU / 500mg',
    category: 'Bone Health',
    scheduleTime: '12:30 PM',
    frequency: 'Once daily (Lunch)',
    instructions: 'Take with lunchtime meal.',
    takenToday: false,
    history: [
      { date: '2026-08-29', taken: true, time: '12:45 PM' },
      { date: '2026-08-28', taken: true, time: '12:30 PM' },
    ],
  },

  // Evelyn Jenkins (p-2)
  {
    id: 'med-5',
    patientId: 'p-2',
    name: 'Clopidogrel (Plavix)',
    dosage: '75mg',
    category: 'Blood Thinner',
    scheduleTime: '09:00 AM',
    frequency: 'Once daily (Morning)',
    instructions: 'Prevents blood clots post-TIA. Report unusual bruising.',
    takenToday: true,
    takenTime: '09:10 AM',
    history: [
      { date: '2026-08-30', taken: true, time: '09:10 AM' },
      { date: '2026-08-29', taken: true, time: '09:00 AM' },
      { date: '2026-08-28', taken: true, time: '09:15 AM' },
    ],
  },
  {
    id: 'med-6',
    patientId: 'p-2',
    name: 'Alendronate (Fosamax)',
    dosage: '70mg',
    category: 'Osteoporosis',
    scheduleTime: '07:30 AM',
    frequency: 'Weekly (Sundays)',
    instructions: 'Take on empty stomach with plain water. Stay upright for 30 minutes.',
    takenToday: true,
    takenTime: '07:35 AM',
    history: [
      { date: '2026-08-30', taken: true, time: '07:35 AM' },
      { date: '2026-08-23', taken: true, time: '07:30 AM' },
    ],
  },

  // Margaret Zhao (p-3)
  {
    id: 'med-7',
    patientId: 'p-3',
    name: 'Celecoxib (Celebrex)',
    dosage: '200mg',
    category: 'Pain Relief & Inflammation',
    scheduleTime: '09:00 AM',
    frequency: 'Once daily post-surgery',
    instructions: 'Take with food for knee rehabilitation pain.',
    takenToday: false,
    history: [
      { date: '2026-08-29', taken: true, time: '09:15 AM' },
      { date: '2026-08-28', taken: true, time: '09:00 AM' },
    ],
  },
  {
    id: 'med-8',
    patientId: 'p-3',
    name: 'Melatonin Gentle Release',
    dosage: '3mg',
    category: 'Sleep Support',
    scheduleTime: '09:30 PM',
    frequency: 'As needed at bedtime',
    instructions: 'Take 30 minutes before sleep if restless.',
    takenToday: false,
    history: [
      { date: '2026-08-29', taken: true, time: '09:45 PM' },
    ],
  },

  // Robert Chen (p-4)
  {
    id: 'med-9',
    patientId: 'p-4',
    name: 'Furosemide (Lasix)',
    dosage: '40mg',
    category: 'Diuretic / Heart Failure',
    scheduleTime: '08:00 AM',
    frequency: 'Once daily morning',
    instructions: 'Take in morning to prevent nighttime urination.',
    takenToday: true,
    takenTime: '08:05 AM',
    history: [
      { date: '2026-08-30', taken: true, time: '08:05 AM' },
      { date: '2026-08-29', taken: true, time: '08:00 AM' },
    ],
  },

  // Eleanor Vance (p-5)
  {
    id: 'med-10',
    patientId: 'p-5',
    name: 'Donepezil (Aricept)',
    dosage: '10mg',
    category: 'Cognitive Health',
    scheduleTime: '08:30 PM',
    frequency: 'Once daily at bedtime',
    instructions: 'Administer with evening snack.',
    takenToday: false,
    history: [
      { date: '2026-08-29', taken: true, time: '08:35 PM' },
    ],
  }
];

export const initialVisits = [
  {
    id: 'v-1',
    patientId: 'p-1',
    patientName: 'Mr. Arthur Sterling',
    patientAddress: '242 Maplewood Terrace, Apt 5B',
    patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    date: 'Today, Oct 24',
    startTime: '09:00 AM',
    endTime: '10:15 AM',
    eta: 'Active Now',
    purpose: 'Daily Vitals & Morning Medication Checklist',
    status: 'in_progress',
    caregiverName: 'Jessica Reynolds, RN',
    checklist: [
      { id: 'c-1', text: 'Lisinopril 10mg (Blood Pressure)', done: true },
      { id: 'c-2', text: 'Metformin 500mg (Diabetes)', done: false },
      { id: 'c-3', text: 'Check Blood Pressure & Glucose Level', done: true },
      { id: 'c-4', text: 'Inspect lower limb edema / stockings', done: false },
    ],
    notes: 'Patient in cheerful spirits this morning. Fasting blood sugar was 118 mg/dL.',
  },
  {
    id: 'v-2',
    patientId: 'p-3',
    patientName: 'Margaret Zhao',
    patientAddress: '118 Pineview Manor, Suite 3A',
    patientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    date: 'Today, Oct 24',
    startTime: '11:30 AM',
    endTime: '12:30 PM',
    eta: '12 mins',
    purpose: 'Physical Therapy Support',
    status: 'upcoming',
    caregiverName: 'Jessica Reynolds, RN',
    checklist: [
      { id: 'c-21', text: 'Assist with 15 knee bend repetitions', done: false },
      { id: 'c-22', text: 'Administer midday anti-inflammatory', done: false },
      { id: 'c-23', text: 'Apply cold cryo-compression wrap', done: false },
    ],
  },
  {
    id: 'v-3',
    patientId: 'p-2',
    patientName: 'Mrs. Evelyn Jenkins',
    patientAddress: 'Room 402, Oakwood Assisted Living',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    date: 'Today, Oct 24',
    startTime: '02:00 PM',
    endTime: '03:15 PM',
    eta: 'Scheduled',
    purpose: 'Fall Prevention Audit & Mobility Assistance',
    status: 'upcoming',
    caregiverName: 'Jessica Reynolds, RN',
  },
  {
    id: 'v-4',
    patientId: 'p-4',
    patientName: 'Robert Chen',
    patientAddress: '512 Cedar Crest Blvd, Unit 12',
    patientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256',
    date: 'Tomorrow, Oct 25',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    eta: 'Tomorrow',
    purpose: 'Heart Failure Weight & Fluid Intake Review',
    status: 'upcoming',
    caregiverName: 'Jessica Reynolds, RN',
  },
  {
    id: 'v-5',
    patientId: 'p-5',
    patientName: 'Eleanor Vance',
    patientAddress: '780 Sunrise Valley Care, Room 108',
    patientAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=256',
    date: 'Tomorrow, Oct 25',
    startTime: '01:30 PM',
    endTime: '02:45 PM',
    eta: 'Tomorrow',
    purpose: 'Cognitive Memory Exercises & Social Walk',
    status: 'upcoming',
    caregiverName: 'Jessica Reynolds, RN',
  }
];

export const initialEmergencyAlerts = [
  {
    id: 'sos-1',
    patientId: 'p-2',
    patientName: 'Mrs. Evelyn Jenkins',
    roomOrAddress: 'Room 402, Oakwood Assisted Living',
    type: 'Fall Detected',
    timestamp: 'Just now (10:14 AM)',
    timeAgo: '2m ago',
    status: 'active',
    severity: 'critical',
    notes: 'Smart sensor detected sudden descent near bedside. Vital bracelet pinged high heart rate.',
  }
];

export const initialMessages = [
  {
    id: 'msg-1',
    senderName: "Sarah (Arthur's Daughter)",
    senderRole: "Family Contact",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    message: 'Thank you for the update on his blood pressure. We will be visiting this Saturday after lunch.',
    timestamp: '10m ago',
    unread: true,
    patientId: 'p-1',
  },
  {
    id: 'msg-2',
    senderName: 'Admin: New Schedule',
    senderRole: 'Clinical Supervisor',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=256',
    message: 'Next week’s roster has been published. Please review your shift assignments and confirm.',
    timestamp: '2h ago',
    unread: false,
  },
  {
    id: 'msg-3',
    senderName: 'Dr. Clara Hernandez',
    senderRole: 'Oakwood Neurologist',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256',
    message: 'Approved new physical therapy adjustments for Mrs. Jenkins. Keep monitoring left grip strength.',
    timestamp: 'Yesterday',
    unread: false,
    patientId: 'p-2',
  }
];

export const initialReminders = [
  {
    id: 'rem-1',
    patientId: 'p-1',
    patientName: 'Mr. Arthur Sterling',
    title: 'Morning Medication Checklist Due',
    time: '08:30 AM',
    type: 'medication',
    details: 'Metformin 500mg and Lisinopril 10mg scheduled.',
    status: 'pending',
  },
  {
    id: 'rem-2',
    patientId: 'p-3',
    patientName: 'Margaret Zhao',
    title: 'Upcoming Home Visit in 12 mins',
    time: '11:30 AM',
    type: 'visit',
    details: 'Physical therapy support session at 118 Pineview Manor.',
    status: 'pending',
  },
  {
    id: 'rem-3',
    patientId: 'p-4',
    patientName: 'Robert Chen',
    title: 'Daily Weight & Fluid Check',
    time: '12:00 PM',
    type: 'vital_check',
    details: 'Check if daily weight log has been entered.',
    status: 'pending',
  }
];

// Generates 14 days of realistic logs for analytics
export const generatePatientHistory = (patientId) => {
  const dates = [
    '2026-08-17', '2026-08-18', '2026-08-19', '2026-08-20',
    '2026-08-21', '2026-08-22', '2026-08-23', '2026-08-24',
    '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28',
    '2026-08-29', '2026-08-30'
  ];

  const moodPool = ['good', 'great', 'good', 'neutral', 'good', 'great', 'good', 'anxious', 'good', 'great', 'good', 'good', 'great', 'good'];
  const moodScores = [4, 5, 4, 3, 4, 5, 4, 2, 4, 5, 4, 4, 5, 4];

  return dates.map((date, idx) => {
    const baseSys = patientId === 'p-1' ? 128 : patientId === 'p-4' ? 134 : 122;
    const baseDia = patientId === 'p-1' ? 82 : 78;
    const variance = (idx % 3) * 2 - (idx % 2) * 3;

    return {
      id: `log-${patientId}-${idx}`,
      patientId,
      date,
      time: '09:00 AM',
      mood: moodPool[idx % moodPool.length],
      moodScore: moodScores[idx % moodScores.length],
      vitals: {
        bloodPressureSystolic: baseSys + variance,
        bloodPressureDiastolic: baseDia + (idx % 4),
        heartRate: 72 + (idx % 5) * 2,
        bloodSugar: patientId === 'p-1' ? 112 + (idx % 4) * 4 : 95 + (idx % 3) * 3,
        oxygenLevel: 97 + (idx % 3),
        temperature: +(98.2 + (idx % 3) * 0.2).toFixed(1),
        sleepHours: 6.5 + (idx % 4) * 0.5,
        painLevel: patientId === 'p-3' ? Math.max(1, 6 - Math.floor(idx / 2)) : Math.max(0, (idx % 3) - 1),
      },
      notes: idx === 13 
        ? 'Patient reported feeling energetic. Good appetite at breakfast.' 
        : idx === 7 
        ? 'Mild joint stiffness noted after rainy morning.' 
        : 'Routine morning checkup completed. Vitals stable.',
      recordedBy: 'Jessica Reynolds, RN',
    };
  });
};

export const initialMoodVitalLogs = {
  'p-1': generatePatientHistory('p-1'),
  'p-2': generatePatientHistory('p-2'),
  'p-3': generatePatientHistory('p-3'),
  'p-4': generatePatientHistory('p-4'),
  'p-5': generatePatientHistory('p-5'),
};
