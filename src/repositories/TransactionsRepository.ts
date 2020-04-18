import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const [income, outcome] = this.transactions.reduce(
      (acumulator, { type, value }) => {
        if (type === 'income') {
          // eslint-disable-next-line no-param-reassign
          acumulator[0] += value;
        } else {
          // eslint-disable-next-line no-param-reassign
          acumulator[1] += value;
        }
        return acumulator;
      },
      [0, 0],
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
