import React, {useState} from "react";
import {SigmoidChart} from "./SigmoidChart";
import {Card} from "primereact/card";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";

export interface EstimatesInterface {
    mean: number,
    deviation: number
}

export const SigmoidBoard: React.FunctionComponent = () => {
    const defaultEstimate = {mean: 0.10, deviation: 10}
    const [estimates, setEstimates] = useState<EstimatesInterface[]>([defaultEstimate])
    const [render, setRender] = useState<number>(0)

    const addEstimate = () => {
        setEstimates([...estimates, defaultEstimate])
        setRender(render + 1)
    }

    const setEstimateMeanValue = (index, value) => {
        estimates[index].mean = value
        setRender(render + 1)
    }

    const setEstimateDeviationValue = (index, value) => {
        estimates[index].deviation = value
        setRender(render + 1)
    }

    return (
        <div className="relative w-full flex">
            <Card className="mr-4">
                <h2 className="pb-4">Create estimation by altering the values</h2>
                {estimates?.map((estimate, index) =>
                    <div className="border-primary mt-4 border-1 p-2 border-round" key={`${index}-estimates-form`}>
                        <h3> Estimate n°{index + 1}</h3>
                        <div className="p-float-label mt-5">
                            <InputNumber mode="decimal" minFractionDigits={2} step={0.01} showButtons name="meanValue"
                                         value={estimate.mean} placeholder="Valeur moyenne"
                                         onValueChange={(e) => setEstimateMeanValue(index, e.value as number)}/>
                            <label htmlFor="meanValue">Valeur moyenne</label>
                        </div>
                        <div className="p-float-label mt-5">
                            <InputNumber mode="decimal" minFractionDigits={2} step={1} showButtons
                                         name="deviantionvalue" value={estimate.deviation}
                                         placeholder="Valeur deviation"
                                         onValueChange={(e) => setEstimateDeviationValue(index, e.value as number)}/>
                            <label htmlFor="deviantionvalue">Valeur de deviation</label>
                        </div>
                    </div>
                )}
                <Button className="w-full mt-4" onClick={addEstimate}>Add Estimate</Button>
            </Card>
            {estimates && <SigmoidChart render={render} estimates={estimates}/>}
        </div>
    )
}