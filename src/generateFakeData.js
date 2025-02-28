import { faker } from '@faker-js/faker/locale/es';

// Función para generar un movimiento aleatorio
const generateRandomMovement = (date) => {
  const isDeposit = faker.datatype.boolean();
  const amount = isDeposit 
    ? faker.number.float({ min: 100, max: 5000, precision: 0.01 })
    : -faker.number.float({ min: 50, max: 2000, precision: 0.01 });
  
  return {
    amount,
    date: faker.date.between({ 
      from: date.setDate(date.getDate() - 30), // Últimos 30 días
      to: new Date() 
    })
  };
};

// Función para generar una cuenta aleatoria
const generateRandomAccount = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const owner = `${firstName} ${lastName}`;
  
  // Generar entre 5 y 12 movimientos aleatorios
  const numMovements = faker.number.int({ min: 5, max: 12 });
  const movements = Array.from({ length: numMovements }, () => 
    generateRandomMovement(new Date())
  ).sort((a, b) => a.date - b.date); // Ordenar por fecha

  return {
    owner,
    movements,
    interestRate: faker.number.float({ min: 0.5, max: 2.5, precision: 0.1 }),
    pin: faker.number.int({ min: 1000, max: 9999 })
  };
};

// Generar un número aleatorio de cuentas (entre 4 y 8)
const generateRandomAccounts = () => {
  const numAccounts = faker.number.int({ min: 4, max: 8 });
  return Array.from({ length: numAccounts }, generateRandomAccount);
};

export { generateRandomAccounts, generateRandomAccount, generateRandomMovement };
