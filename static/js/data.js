function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

d3.json('api/MSFT/cleaned').then(function(data){
	data = data.sort(function(a, b){return a['Date']-b['Date']});

	data = data.map(function(x){
  	let date = new Date(x['Date']);
  	x['Date'] = formatDate(date);
  	return x
  });

  data.forEach(function(row){
  	let table_row = "<tr><th scope='row'>"+row['Date']+"</th><td>"+row['Adj Close']+"</td><td>"+row['Close']+"</td><td>"+row['High']+"</td><td>"+row['Low']+"</td><td>"+row['Open']+"</td><td>"+row['Volume']+"</td></tr>";

  	$("#table_body")
		.append(table_row)
  })
});