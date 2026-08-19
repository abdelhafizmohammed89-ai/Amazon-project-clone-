import{formatCurrency} from'../../scripts/utils/money.js';

describe('test suite: formatCurrency', ()=>{
  it('converts centes into dollars', ()=>{
 expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('workd with 0', ()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('round numbers>=5', ()=>{
   expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('round numbers<=5', ()=>{
  expect(formatCurrency(2000.4)).toEqual('20.00');
  });

  it('worked with negative', ()=>{
    expect(formatCurrency(-2000.5)).toEqual('-20.00')
  });
});

