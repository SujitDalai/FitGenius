import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import { AiOutlineEye } from 'react-icons/ai';
import './HomeBanner1.css';

const HomeBanner1 = () => {
  const [data, setData] = React.useState<any>(null);

  const getData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/report/getreport', {
        method: 'GET',
        credentials: 'include',
      });
      const result = await response.json();
      if (result.ok) {
        setData(result.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error(err);
      setData([]);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  // Simplify the fraction
  // function simplifyFraction(numerator: number, denominator: number): [number, number] {
  //   // Handle cases where denominator is zero or negative values
  //   if (denominator === 0) return [numerator, denominator]; // Avoid division by zero

  //   function gcd(a: number, b: number): number {
  //     a = Math.abs(a);
  //     b = Math.abs(b);
  //     if (b === 0) return a; // Ensure non-negative result
  //     return gcd(b, a % b);
  //   }

  //   const commonDivisor: number = gcd(numerator, denominator);

  //   // Simplify the fraction
  //   const simplifiedNumerator: number = numerator / commonDivisor;
  //   const simplifiedDenominator: number = denominator / commonDivisor;

  //   return [simplifiedNumerator, simplifiedDenominator];
  // }

  return (
    <div className='meters'>
      {data?.length > 0 && data.map((item: any, index: number) => (
        <div className='card' key={index}>
          <div className='card-header'>
            <div className='card-header-box'>
              <div className='card-header-box-name'>{item.name}</div>
              <div className='card-header-box-value'>{parseInt(item.value)} {item.unit}</div>
            </div>
            <div className='card-header-box'>
              <div className='card-header-box-name'>Target</div>
              <div className='card-header-box-value'>{parseInt(item.goal)} {item.goalUnit}</div>
            </div>
          </div>

          <CircularProgress
            color="neutral"
            determinate
            variant="solid"
            size="lg"
            value={(item.value / item.goal) * 100}
          >
            <div className='textincircle'>
              <span>{
                parseInt(item.value)}
              </span>
              <span className='hrline'></span>
              <span>{
                parseInt(item.goal)}
              </span>
              {/* {simplifyFraction(item.value, item.goal)[0]} / {simplifyFraction(item.value, item.goal)[1]} */}
            </div>
          </CircularProgress>

          <button onClick={() => {
            window.location.href = `/report/${item.name}`;
          }}>
            Progress <AiOutlineEye />
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomeBanner1;
