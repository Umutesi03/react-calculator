import { useState, useEffect } from 'react';

export default function Calculator() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (input1 === '' || input2 === '') {
      setError('Both inputs are required');
      return false;
    }
    if (operation === '') {
      setError('Please select an operation');
      return false;
    }
    if (operation === 'divide' && Number(input2) === 0) {
      setError('Cannot divide by zero');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const num1 = Number(input1);
    const num2 = Number(input2);
    let res = 0;

    switch (operation) {
      case 'add':
        res = num1 + num2;
        break;
      case 'subtract':
        res = num1 - num2;
        break;
      case 'multiply':
        res = num1 * num2;
        break;
      case 'divide':
        res = num1 / num2;
        break;
      default:
        res = 0;
    }

    setResult(res);

    setInput1('');
    setInput2('');
    
  };

  useEffect(() => {
    if (result !== null) {
      console.log('Result:', result);
    }
  }, [result]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">React Calculator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="First number"
          className="w-full px-4 py-2 border rounded-lg border-blue-600"
        />
        <input
          type="number"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Second number"
          className="w-full px-4 py-2 border rounded-lg border-blue-600"
        />
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg border-blue-600"
        >
          <option value="">Select operator</option>
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (−)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Calculate
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-500 font-semibold">{error}</div>
      )}

      {result !== null && !error && (
        <div className="mt-4 text-green-600 font-bold text-lg">
          Result: {result}
        </div>
      )}
    </div>
  );
}
