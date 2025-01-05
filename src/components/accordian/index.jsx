import React from 'react'
import { useState } from 'react'
import data from './data';

const Accordian = () => {
    
    const [selected, setSelected] = useState(null);

    const [enableMultiSelection, setEnableMultiSelection] = useState(false);

    const [multiple, setMultiple] = useState([]);


    function handleSingleSelection(getCurrentId) {
        console.log(getCurrentId);
        setSelected(getCurrentId === selected ? null : getCurrentId);

    }


    function handleMultipleSelection(getCurrentId) {
        let copyMultiple = [...multiple];
        
        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);
        
        console.log(findIndexOfCurrentId);

        if (findIndexOfCurrentId === -1) {
            copyMultiple.push(getCurrentId);
        }
        else {
            copyMultiple.splice(findIndexOfCurrentId, 1);
        }

        setMultiple(copyMultiple);

    }


    console.log(selected, multiple);
;

  
    return (
        <div className="wrapper flex h-full w-full justify-center items-center flex-col gap-4 p-4">

            <button
                onClick={() => setEnableMultiSelection(!enableMultiSelection)} 
                
                className="px-2 py-2 bg-white text-red-600 text-xl  font-bold rounded-lg hover:bg-red-600 hover:text-white cursor-pointer">
                See Multiple
            
            </button>
            <div className="accordian w-[500px] max-w-2xl ">

                {data && data.length > 0 ? (
                
                    data.map((dataItem) => (
                        <div className="item  bg-sky-700 mb-4 px-2 py-4"
                        key= {dataItem.id}>
                            
                            <div className="title text-white flex justify-between align-center cursor-pointer rounded-lg" 
                                onClick={
                                    enableMultiSelection 
                                    ? () => handleMultipleSelection(dataItem.id) 
                                    : () => handleSingleSelection(dataItem.id)
                                }

                                title={dataItem.id} 
                            >
                                <h2
                                 className="font-bold text-lg md:text-xl lg:text-2xl"
                                >
                                    {dataItem.question}
                                
                                </h2>
                                <span
                                className="font-bold text-lg md:text-xl lg:text-2xl"
                                >+</span>
                                
                            </div>
                            {
                                selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? (
                                    <div className="content bg-white text-red-600 p-4 mt-2 rounded-lg h-auto text-left">
                                        <div className="p-4 text-left" dangerouslySetInnerHTML={ {__html: dataItem.answer} }></div>
                                    </div>
                                ) : null                             }
                        </div>
                    ))
                ) : (
                    <div>No data found.</div> 
              )}
            </div>
          
        </div>
    );
};

export default Accordian;