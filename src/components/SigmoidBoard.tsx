import React, {useState} from "react";
import {SigmoidForm} from "./SigmoidForm";
import {SigmoidChart} from "./SigmoidChart";
import {Card} from "primereact/card";
import {InputNumber} from "primereact/inputnumber";

export const SigmoidBoard: React.FunctionComponent = () => {
    const [totalValue, setTotalValue] = useState(10000)
    const [meanValue, setMeanValue] = useState(0.10)
    const [deviationValue, setDeviationValue] = useState(10)

    return (
        <div className="relative w-full flex">
            <Card className="mr-4">
                <h2 className="pb-4">Alter the values</h2>
           <span className="p-float-label mt-4">
                <InputNumber mode="decimal" minFractionDigits={2} step={10} showButtons name="totalvalue" id="totalvalue"  value={totalValue} placeholder="Valeur total" onValueChange={(e) => setTotalValue(e.value as number)}/>
               <label htmlFor="totalvalue">Valeur totale</label>
            </span>

                <span className="p-float-label mt-4">
                <InputNumber mode="decimal" minFractionDigits={2} step={0.01} showButtons name="meanValue" id="meanValue" value={meanValue} placeholder="Valeur moyenne" onValueChange={(e) => setMeanValue(e.value as number)}/>
               <label htmlFor="meanValue">Valeur moyenne</label>
            </span>

                <span className="p-float-label mt-4">
                <InputNumber mode="decimal" minFractionDigits={2} step={1} showButtons id="deviantionvalue" name="deviantionvalue" value={deviationValue} placeholder="Valeur deviation" onValueChange={(e) => setDeviationValue(e.value as number)}/>
               <label htmlFor="deviantionvalue">Valeur de deviation</label>
            </span>
            </Card>
            <SigmoidChart deviation={deviationValue} mean={meanValue} totalValue={totalValue}/>
        </div>
    )
}