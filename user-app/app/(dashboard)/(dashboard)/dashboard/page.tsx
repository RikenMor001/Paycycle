import React from 'react'
import CryptoChart from '../../api/displayChart/Cryptochart'

export default function Dashboard(){
    return <div>
        <div className="font-semibold text-xl">
            Dashboard
        </div>
        <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
            <CryptoChart/>
        </div>
    </div>
};
