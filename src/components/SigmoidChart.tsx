import React, {useEffect, useState} from "react";
import {Chart} from 'primereact/chart';
import {dataService, SeriesInterface} from '../utils/math/Dataservices'
import {Card} from "primereact/card";
import {InputNumber} from "primereact/inputnumber";
import {EstimatesInterface} from "./SigmoidBoard";

interface SigmoidChartInterface {
    estimates: EstimatesInterface[]
    render: number
}

export const SigmoidChart: React.FunctionComponent<SigmoidChartInterface> = (props: SigmoidChartInterface) => {
    const [chartData, setChartData] = useState({});
    const [startValue, setStartValue] = useState(0);
    const [stepValue,] = useState(2);
    const [endValue, setEndValue] = useState(10);
    const [totalValue, setTotalValue] = useState(100)

    useEffect(() => {
        const series = []
        const dataset = []
        props.estimates.map((estimate, index) => {
            series.push(dataService.sigmoidSeries(startValue, endValue, stepValue, estimate.mean, estimate.deviation, totalValue))
            dataset.push({
                label: `Estimation n °${index + 1} `,
                data: series[index]?.map((data) => data.value),
                fill: false,
                tension: 0.4
            })
        })

        const data = {
            labels: series[0]?.map((data) => data.x),
            datasets: dataset
        }
        setChartData(data)

    }, [stepValue, startValue, endValue, totalValue, props.estimates, props.render, props.estimates.length])

    return (<Card className='w-full'>
            <div className="p-float-label mt-5">
                <InputNumber step={10} showButtons name="totalvalue"
                             value={totalValue} placeholder="Valeur total"
                             onValueChange={(e) => setTotalValue(e.value as number)}/>
                <label htmlFor="totalvalue">Valeur totale</label>
            </div>
            <Chart type="line" data={chartData} style={{position: 'relative', width: '100%'}}/>

            <div className="flex justify-content-between mt-6 flex-wrap">
                <div className="p-float-label mr-2">
                    <InputNumber name="minvalue" placeholder="Min Value" value={startValue}
                                 step={1} min={0} showButtons
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
