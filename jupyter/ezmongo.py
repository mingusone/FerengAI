import pymongo
client = pymongo.MongoClient("mongodb+srv://ming:ming123@ferengai-tiysn.mongodb.net/test?retryWrites=true&w=majority")

def get_data(company, type_of_data):
	db = client[company]
	col = db[type_of_data]
	stock_data = col.find()

	# Put company data into a dataframe
	import pandas as pd
	df = pd.DataFrame(list(stock_data))

	#Get rid of the mongo objectID column
	df.drop('_id', axis=1, inplace=True)

	# The order of the columns are messed up. Column 1 should always be the date!
	# So we will reorder it by copying the date column and placing it into a new DF
	df_new = df[['Date']]

	# Remove the Date column we just pulled out which should leave everything else
	df.drop('Date', axis=1, inplace=True)

	# Now we just transplant the rest of the columns over....
	# Note: There may be a better way to do this but this is just how I figure it out.
	for column in df.columns:
	    df_new[column] = df[column]

	return df_new 

def set_data(dataframe, company, type_of_data):
	db = client[company]
	col = db[type_of_data]

	# Change the DataFrame into records form, more mongo friendly
	# and makes it easier to convert back to a DF later on
	upload = rolled.to_dict('records')

	# Delete the old one
	col.drop()
	col.insert(upload)

	return True