export const mockUser = { name: 'Elliot C.', initials: 'EC', email: 'elliot@daviddid.app' }

export const mockRecovery = {
  score: 87, label: 'Push',
  directive: "You crushed the hypertrophy block — recovery's holding at 87. Easy Zone-2 at 5:30 is all that's left to train. Keep your fueling up; you're running behind.",
  hrv: 62, hrvDelta: 4, restingHR: 52, restingHRDelta: -2,
  sleep: { total: '7h 22m', quality: 83, efficiency: 94, spo2: 97, deep: '1h 42m', rem: '2h 10m', core: '3h 22m', awake: '8m' },
  hrvWeek: [48, 38, 42, 32, 54, 52, 62],
  hrvMonth: Array.from({length:30},(_,i)=>Math.round(50+Math.sin(i/3)*8+(i*0.3))),
}

export const mockTraining = {
  weekDone: 4, weekTotal: 6, weekKcal: 3820, weekHours: 4.2,
  sessions: [
    { id:1, name:'Lower body + core',                   sub:'5×5 back squat, RDL, core',      duration:'60 min', day:'Sat Jun 7',  status:'done'     },
    { id:2, name:'Zone 2 aerobic base',                 sub:'130–145bpm steady state',         duration:'45 min', day:'Fri Jun 6',  status:'done'     },
    { id:3, name:'Upper body pull + shoulders',         sub:'Pull-ups, rows, lateral raises',  duration:'55 min', day:'Wed Jun 4',  status:'done'     },
    { id:4, name:'Upper body strength — Push protocol', sub:'Bench, OHP, dips, triceps',       duration:'55 min', day:'Today',      status:'today'    },
    { id:5, name:'Zone 2 cardio',                       sub:'Easy aerobic recovery pace',      duration:'40 min', day:'Tue Jun 9',  status:'upcoming' },
    { id:6, name:'Full body power day',                 sub:'Cleans, deadlift, plyometrics',   duration:'65 min', day:'Thu Jun 11', status:'upcoming' },
  ],
}

export const mockNutrition = {
  calories: { current:2340, target:2600 },
  protein:  { current:178,  target:200  },
  carbs:    { current:241,  target:270  },
  fat:      { current:72,   target:80   },
  davidNote:"You're 260 calories under with dinner still to go. Hit 50g+ protein at dinner — hard upper body session today, you need the glycogen.",
  meals: [
    { name:'Breakfast — Oats, eggs, banana', time:'7:30am',  macros:'P:38 C:72 F:14', kcal:580 },
    { name:'Lunch — Chicken rice bowl',      time:'12:45pm', macros:'P:55 C:85 F:18', kcal:720 },
    { name:'Snack — Greek yogurt + berries', time:'3:15pm',  macros:'P:22 C:28 F:4',  kcal:240 },
  ],
}

export const mockAnalytics = {
  avgRecovery:78, avgHRV:58, sessionsDone:22, sessionsTotal:26,
  avgSleep:'7h 8m', avgKcal:2420, avgRestingHR:53,
  recoveryTrend: Array.from({length:30},(_,i)=>Math.round(58+(i*0.7)+[4,-3,2,-1,5,0,3,-2,4,1][i%10])),
  weightTrend: [188,187.5,187,186.5,186,185.5,185,184.5,184,183.5,183,182.5,182,182,181.5,181,181,180.5,180.5,180,180,182,182.5,182,181.5,181,181,180.5,180,182],
  strengthTrend: [185,185,190,190,195,195,200,200,205,205,210,210,215,215,215,220,220,220,225,225],
}

export const mockLifts = {
  'Back Squat': [
    { date:'May 1',  sets:[{w:185,r:5},{w:185,r:5},{w:185,r:4}] },
    { date:'May 6',  sets:[{w:195,r:5},{w:195,r:5},{w:195,r:5}] },
    { date:'May 12', sets:[{w:200,r:5},{w:200,r:4},{w:195,r:5}] },
    { date:'May 17', sets:[{w:205,r:5},{w:205,r:5},{w:205,r:4}] },
    { date:'May 22', sets:[{w:210,r:5},{w:210,r:5},{w:210,r:5}] },
    { date:'May 28', sets:[{w:215,r:5},{w:215,r:4},{w:210,r:5}] },
    { date:'Jun 2',  sets:[{w:220,r:5},{w:220,r:5},{w:220,r:5}] },
    { date:'Jun 7',  sets:[{w:225,r:5},{w:225,r:4},{w:220,r:5}] },
  ],
  'Bench Press': [
    { date:'May 2',  sets:[{w:155,r:5},{w:155,r:5},{w:155,r:4}] },
    { date:'May 8',  sets:[{w:160,r:5},{w:160,r:5},{w:160,r:5}] },
    { date:'May 14', sets:[{w:165,r:5},{w:165,r:4},{w:160,r:5}] },
    { date:'May 20', sets:[{w:170,r:5},{w:170,r:5},{w:170,r:5}] },
    { date:'May 26', sets:[{w:175,r:5},{w:175,r:4},{w:170,r:5}] },
    { date:'Jun 1',  sets:[{w:180,r:5},{w:180,r:5},{w:180,r:5}] },
    { date:'Jun 8',  sets:[{w:185,r:5},{w:185,r:4},{w:180,r:5}] },
  ],
  'Deadlift': [
    { date:'May 3',  sets:[{w:265,r:3},{w:265,r:3},{w:265,r:3}] },
    { date:'May 10', sets:[{w:275,r:3},{w:275,r:3},{w:275,r:3}] },
    { date:'May 17', sets:[{w:285,r:3},{w:285,r:3},{w:280,r:3}] },
    { date:'May 24', sets:[{w:295,r:3},{w:295,r:3},{w:295,r:3}] },
    { date:'May 31', sets:[{w:305,r:3},{w:305,r:3},{w:300,r:3}] },
    { date:'Jun 7',  sets:[{w:315,r:3},{w:315,r:3},{w:315,r:3}] },
  ],
  'OHP': [
    { date:'May 5',  sets:[{w:105,r:5},{w:105,r:5},{w:105,r:4}] },
    { date:'May 12', sets:[{w:110,r:5},{w:110,r:5},{w:110,r:5}] },
    { date:'May 19', sets:[{w:115,r:5},{w:115,r:4},{w:110,r:5}] },
    { date:'May 26', sets:[{w:120,r:5},{w:120,r:5},{w:120,r:5}] },
    { date:'Jun 2',  sets:[{w:125,r:5},{w:125,r:4},{w:120,r:5}] },
    { date:'Jun 8',  sets:[{w:125,r:5},{w:125,r:5},{w:125,r:5}] },
  ],
}

export const mockPeople = [
  { id:1, initials:'MR', name:'Marcus Reid',  role:'Performance coach',  permission:'full',   color:'#64a0ff', status:'active'  },
  { id:2, initials:'JS', name:'Jordan S.',    role:'Training partner',   permission:'viewer', color:'#C8F560', status:'active'  },
  { id:3, initials:'?',  name:'kate@gym.com', role:'Invite pending',     permission:'editor', color:'#6B6B5E', status:'pending' },
]

export const mockMessages = [
  { role:'assistant', content:"You crushed the hypertrophy block — recovery's holding at 87. Easy Zone-2 at 5:30 is all that's left to train. Keep your fueling up; you're running behind.", time:'8:02' },
]
