export const projectsList = [
  {
    id: 1,
    name: 'autodesk',
    progress: 86,
    users: [
      {
        id: 1,
        ava: 'ava3',
        name: 'Jhon Smith',
        position: 'Team leader',
        pos_id: 'leader'
      },
      {
        id: 2,
        ava: 'ava2',
        name: 'Raima Hasan',
        position: 'SQA Engineer',
        pos_id: 'qa'
      },
      {
        id: 3,
        ava: 'ava4',
        name: 'Nisha Anjum',
        position: 'Developer',
        pos_id: 'dev'
      },
      {
        id: 4,
        ava: 'ava5',
        name: 'Sami Ahmed',
        position: 'Network Support',
        pos_id: 'support'
      }
    ]
  },
  {
    id: 2,
    name: 'target',
    progress: 64,
    users: [
      {
        id: 5,
        ava: 'ava6',
        name: 'Mike Stivens',
        position: 'Team leader',
        pos_id: 'leader'
      },
      {
        id: 6,
        ava: 'ava7',
        name: 'Jim morgan',
        position: 'SQA Engineer',
        pos_id: 'qa'
      },
      {
        id: 7,
        ava: 'ava8',
        name: 'Sarah Johnson',
        position: 'Developer',
        pos_id: 'dev'
      },
      {
        id: 8,
        ava: 'ava9',
        name: 'Julia thomson',
        position: 'Network Support',
        pos_id: 'support'
      }
    ]
  },
  {
    id: 3,
    name: 'remax',
    progress: 72,
    users: [
      {
        id: 9,
        ava: 'ava10',
        name: 'Willy Tylar',
        position: 'Team leader',
        pos_id: 'leader'
      },
      {
        id: 10,
        ava: 'ava11',
        name: 'Arin Hylda',
        position: 'SQA Engineer',
        pos_id: 'qa'
      },
      {
        id: 11,
        ava: 'ava12',
        name: 'Antony Wilmer',
        position: 'Developer',
        pos_id: 'dev'
      },
      {
        id: 12,
        ava: 'ava13',
        name: 'Jordana Valarie',
        position: 'Network Support',
        pos_id: 'support'
      }
    ]
  }
]

export const projectHistoryList = [
  {
    id: 1,
    name: 'autodesk',
    created: '25 May, 2020',
    team_leader: 'Raima Hasan',
    execution_term: '10 July, 2020',
    status: 'In Process'
  },
  {
    id: 2,
    name: 'target',
    created: '12 May, 2020',
    team_leader: 'Leo Resim',
    execution_term: '28 June, 2020',
    status: 'In Process'
  },
  {
    id: 3,
    name: 'remax',
    created: '21 April, 2020',
    team_leader: 'Tamim Iqbal',
    execution_term: '11 June, 2020',
    status: 'Open'
  }
]

export const menuList = [
  {
    id: 'main',
    icon: 'btn1',
    viewBox: '0 0 37 38'
  },
  {
    id: 'projects',
    icon: 'btn2',
    viewBox: '0 0 35 35'
  },
  {
    id: 'members',
    icon: 'btn3',
    viewBox: '0 0 39 32'
  },
  {
    id: 'status',
    icon: 'dynamics',
    viewBox: '0 0 24 24'
  }
  // {
  //   id: 'calendar',
  //   icon: 'btn4',
  //   viewBox: '0 0 35 36'
  // },
  // {
  //   id: 'settings',
  //   icon: 'btn5',
  //   viewBox: '0 0 35 35'
  // }
]

export const positions = [
  {
    id: 'leader',
    name: 'Team leaders'
  },
  {
    id: 'dev',
    name: 'Developers'
  },
  {
    id: 'qa',
    name: 'QA Engineers'
  },
  {
    id: 'support',
    name: 'Support'
  }
]
