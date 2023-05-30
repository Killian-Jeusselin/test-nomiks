class DataServices {

    _getSeries(start, end, step) {
        const series = [];

        if (start !== 0) {
            series.push(0)
        }
        let i;
        for (i = start; i <= end; i += step)
            series.push(i);

        if (i !== end + step )
            series.push(end);

        return series;
    }

    sigmoidSeries(start:number, end:number, step:number | null, mean:number, deviation:number, totalValue:number) {
        step = step ??  Math.floor((end-start) / 10);
        const sigmoid = (x) => {
            if (x <= 0)
                return 0;
            if(x===end-start)
                return totalValue;

            return 1 / (1 + Math.exp(-mean * (x - deviation))) * totalValue;
        }

        const series = this._getSeries(start, end, step);
        let sigmoidSeries = [];
        series.forEach((x) => {
            sigmoidSeries.push({x, value: sigmoid(x - start)});
        });
        return sigmoidSeries;
    }

}


const dataService = new DataServices();
export {dataService}