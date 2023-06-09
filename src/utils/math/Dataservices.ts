export interface SeriesInterface {
    x: number;
    value: number
}

class DataServices {

    _getSeries(start: number, end: number, step: number) {
        const series = [];

        if (start !== 0) {
            series.push(0)
        }
        let i;
        for (i = start; i <= end; i += step)
            series.push(i);

        if (i !== end + step)
            series.push(end);

        return series;
    }

    sigmoidSeries(start: number, end: number, step: number | null, mean: number, deviation: number, totalValue: number): SeriesInterface[] {
        step = step ?? Math.floor((end - start) / 10);
        const sigmoid = (x: number) => {
            if (x <= 0)
                return 0;
            if (x === end - start)
                return totalValue;

            return 1 / (1 + Math.exp(-mean * (x - deviation))) * totalValue;
        }

        const series = this._getSeries(start, end, step);
        let sigmoidSeries: SeriesInterface[] = [];

        series.forEach((x) => {
            sigmoidSeries.push({x, value: sigmoid(x - start)});
        });
        return sigmoidSeries;
    }
}


const dataService = new DataServices();
export {dataService}