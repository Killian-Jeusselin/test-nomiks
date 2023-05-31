import React, {useEffect, useState} from "react";
import {Chart} from 'primereact/chart';
import {dataService} from '../utils/math/Dataservices'
import {Card} from "primereact/card";
import {InputNumber} from "primereact/inputnumber";
import {Slider} from "primereact/slider";

interface SigmoidChartInterface {
    start?: number
    end?: number
    mean: number
    deviation: number
    totalValue: number
}


export const SigmoidChart: React.FunctionComponent<SigmoidChartInterface> = (props: SigmoidChartInterface) => {
    const [chartData, setChartData] = useState({});
    const [startValue, setStartValue] = useState(0);
    const [stepValue, _setStepValue] = useState(2);
    const [endValue, setEndValue] = useState(10);

    useEffect(() => {
        const sigmoidSeries = dataService.sigmoidSeries(startValue, endValue, stepValue*endValue, props.mean, props.deviation, props.totalValue);

        const data = {
            labels: sigmoidSeries.map((data) => data.x),
            datasets: [
                {
                    label: 'First Estimation',
                    data: sigmoidSeries.map((data) => data.value),
                    fill: false,
                    tension: 0.4
                },
            ]
        }
        setChartData(data)
    }, [stepValue, startValue, endValue, props])

    return (<Card className='w-full'>
            <Chart type="line" data={chartData} style={{position: 'relative', width: '100%'}}/>
            <div className="flex justify-content-between mt-6 flex-wrap">
                <div className="p-float-label mr-2">
                    <InputNumber name="minvalue" label={'hello'} placeholder="Min Value" value={startValue}
                                 step={1} showButtons
                                 onValueChange={(e) => setStartValue(e.value as number)}/>
                    <label htmlFor="minvalue">Valeur de départ</label>
                </div>

                <div className="p-float-label">
                    <InputNumber value={endValue} placeholder="Max Value"
                                 name="maxvalue"
                                 onValueChange={(e) => setEndValue(e.value as number)}
                                 showButtons min={startValue + 1} step={1}/>
                    <label htmlFor="maxvalue">Valeur finale</label>
                </div>
            </div>
     </Card>
    )
};
