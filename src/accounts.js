// Data
const account1 = {
    owner: "Juan Sánchez",
    movements: [
      { amount: 200, date: new Date("2025-02-25T10:00:00") },
      { amount: 450, date: new Date("2025-02-26T14:30:00") },
      { amount: -400, date: new Date("2025-02-26T17:15:00") },
      { amount: 3000, date: new Date("2025-02-27T09:45:00") },
      { amount: -650, date: new Date("2025-02-27T12:20:00") },
      { amount: -130, date: new Date("2025-02-27T15:00:00") },
      { amount: 70, date: new Date("2025-02-28T11:30:00") },
      { amount: 1300, date: new Date("2025-02-28T13:15:00") }
    ],
    interestRate: 1.2, // %
    pin: 1111,
  };
  
  const account2 = {
    owner: "María Portazgo",
    movements: [
      { amount: 5000, date: new Date("2025-02-25T09:00:00") },
      { amount: 3400, date: new Date("2025-02-26T11:15:00") },
      { amount: -150, date: new Date("2025-02-26T14:30:00") },
      { amount: -790, date: new Date("2025-02-27T10:45:00") },
      { amount: -3210, date: new Date("2025-02-27T16:20:00") },
      { amount: -1000, date: new Date("2025-02-28T09:00:00") },
      { amount: 8500, date: new Date("2025-02-28T11:45:00") },
      { amount: -30, date: new Date("2025-02-28T12:30:00") }
    ],
    interestRate: 1.5,
    pin: 2222,
  };
  
  const account3 = {
    owner: "Estefanía Pueyo",
    movements: [
      { amount: 200, date: new Date("2025-02-26T10:30:00") },
      { amount: -200, date: new Date("2025-02-26T15:45:00") },
      { amount: 340, date: new Date("2025-02-27T09:15:00") },
      { amount: -300, date: new Date("2025-02-27T14:20:00") },
      { amount: -20, date: new Date("2025-02-27T16:30:00") },
      { amount: 50, date: new Date("2025-02-28T10:00:00") },
      { amount: 400, date: new Date("2025-02-28T11:30:00") },
      { amount: -460, date: new Date("2025-02-28T13:00:00") }
    ],
    interestRate: 0.7,
    pin: 3333,
  };
  
  const account4 = {
    owner: "Javier Rodríguez",
    movements: [
      { amount: 430, date: new Date("2025-02-26T13:15:00") },
      { amount: 1000, date: new Date("2025-02-27T10:30:00") },
      { amount: 700, date: new Date("2025-02-27T15:45:00") },
      { amount: 50, date: new Date("2025-02-28T09:20:00") },
      { amount: 90, date: new Date("2025-02-28T12:00:00") }
    ],
    interestRate: 1,
    pin: 4444,
  };
  
  const accounts = [account1, account2, account3, account4];
  
  export default accounts;