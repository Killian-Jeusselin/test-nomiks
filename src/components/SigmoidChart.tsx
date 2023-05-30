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
    const [endValue, setEndValue] = useState(120);

    useEffect(() => {
        const step = 8
        const sigmoidSeries = dataService.sigmoidSeries(startValue, endValue, step, props.mean, props.deviation, props.totalValue);

        const data = {
            labels: sigmoidSeries.map((data) => data.x),
            datasets: [
                {
                    label: 'Your Estimation',
                    data: sigmoidSeries.map((data) => data.value),
                    fill: false,
                    tension: 0.4
                },
            ]
        }
        setChartData(data)
    }, [ startValue, endValue, props])

    return (<Card className='w-full'>
            <Chart type="line" data={chartData} style={{position: 'relative', width: '100%'}}/>
            <div className="flex justify-content-between mt-6 flex-wrap">
            <span className="p-float-label mr-2">
                <InputNumber name="minvalue" label={'hello'} placeholder="Min Value" value={startValue}
                             step={10} showButtons min={0}
                             onValueChange={(e) => setStartValue(e.value as number)} />
                <label htmlFor="minvalue">Valeur de départ</label>
            </span>

                <span className="p-float-label">
            <InputNumber value={endValue} placeholder="Min Value" onValueChange={(e) => setEndValue(e.value as number)}
                        showButtons min={1}  step={10} />
                            <label htmlFor="minvalue">Valeur finale</label>
            </span>
            </div>
        </Card>
    )
};
