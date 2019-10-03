d3.json('api/ai/MSFT/AI').then(function(data) {

	data = data.sort(function(a, b){return a['Date']-b['Date']});

  let dates = data.map(function(x){
  	// let date = (x['Date']);
  	let date = new Date(x['Date']);
  	return date
  })

  let price = data.map(function(x){
  	let column = x['Close'];
  	return column
  })

  let graph_price = data.map(function(x){
  	let column = (x['Close']*200);
  	return column
  })

  let AIchoice = data.map(function(x){
  	let column = new Date(x['AIchoice']);
  	return column
  })

  let AIbank = [];
  let AImoney = 10000;
  let AIshares = 0;
  let Pbank = [];
  let Pmoney = 10000;
  let Pshares = 0;

  for (let i = 0; i < data.length; i++) {
  	let curr = data[i];
  	console.log(curr)

  	// Price per share
  	let PPS = curr['Close'];

  	// =====================The AI=====================
  	if (curr['AIchoice'] == 1) {
  		//Calculate how many shares the AI can buy
  		let total_shares  = AImoney / PPS
  		let total_cost = total_shares * PPS
  		//Change the bank
  		AImoney -= total_cost;
  		AIshares += total_shares;
  	}
  	else {
  		//Calculate how many shares the AI can sell
  		let total_sale = AIshares * PPS

  		//Change the bank
  		AImoney += total_sale;
  		AIshares = 0;
  	}

  	// AIBank is the total value of cash plus net assets
  	AIbank.push(AImoney + (AIshares*PPS));

  	// =====================The Prophet=====================
  	if (curr['BuyOrSell'] == 1) {
  		//Calculate how many shares the AI can buy
  		let total_shares  = Pmoney / PPS
  		let total_cost = total_shares * PPS
  		//Change the bank
  		Pmoney -= total_cost;
  		Pshares += total_shares;
  	}
  	else {
  		//Calculate how many shares the AI can sell
  		let total_sale = Pshares * PPS

  		//Change the bank
  		Pmoney += total_sale;
  		Pshares = 0;
  	}

  	// AIBank is the total value of cash plus net assets
  	Pbank.push(Pmoney + (Pshares*PPS));

  };



	var trace1 = {
		mode: 'lines',
  	type: 'scatter',
	  x: dates,
	  y: graph_price,
	  name: 'Stock Price x200'
	};

	var trace2 = {
		mode: 'lines',
  	type: 'scatter',
	  x: dates,
	  y: AIbank,
	  name: 'AI total value'
	};

	var trace3 = {
		mode: 'lines',
  	type: 'scatter',
	  x: dates,
	  y: Pbank,
	  name: 'Prophet total value'
	};

	var data = [trace1, trace2, trace3];

	Plotly.newPlot('graph', data);



});