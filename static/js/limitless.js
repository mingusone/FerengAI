d3.json('api/MSFT/AI').then(function(data) {

	data = data.sort(function(a, b){return a['Date']-b['Date']});

  let dates = data.map(function(x){
  	let date = new Date(x['Date']);
  	return date
  })

  let price = data.map(function(x){
  	let column = x['Close'];
  	return column
  })

  let AIchoice = data.map(function(x){
  	let column = new Date(x['AIchoice']);
  	return column
  })
  let Pbank = [];
  let Pmoney = 10000;
  let Pshares = 0;

  for (let i = 0; i < data.length; i++) {
  	let curr = data[i];
    let next = {};
    try {
      next = data[i+1];
    }
    catch (x) {
      next = curr;
    }

  	// Price per share
  	let PPS = curr['Close'];
    let NPPS = 0;

    try {
      NPPS = next['Close'];
    } catch (x) {
      NPPS = PPS;
    }


  	// =====================The Pill=====================
  	if (PPS <= NPPS) {
  		//Calculate how many shares the AI can buy
  		let shares_can_buy  = Pmoney / PPS;
  		let total_cost = shares_can_buy * PPS;

  		//Change the bank
  		Pmoney -= total_cost;
  		Pshares += shares_can_buy;
  	}
  	else if (PPS > NPPS) {
  		//Calculate how many shares the AI can sell
  		let total_sale = Pshares * PPS

  		//Change the bank
  		Pmoney += total_sale;
  		Pshares = 0;
  	}

  	// AIBank is the total value of cash plus net assets
  	Pbank.push(Pmoney + (Pshares*PPS));

  };

  //And what if it was only hodl?
  let hodl_shares = 10000 / price[0]
  let hodl = price.map(function(x){
      value = x*hodl_shares
    return value
  })



	var trace1 = {
		mode: 'lines',
  	type: 'scatter',
	  x: dates,
	  y: price,
	  name: 'Stock Price'
	};

	var trace2 = {
		mode: 'lines',
  	type: 'scatter',
	  x: dates,
	  y: Pbank,
	  name: 'NZT-48'
	};

  var trace3 = {
    mode: 'lines',
    type: 'scatter',
    x: dates,
    y: hodl,
    name: 'HODL'
  };

	var data = [trace1, trace2, trace3];

	Plotly.newPlot('graph', data);



});