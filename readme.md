<<<<<<< HEAD
# Machine learning
![neuralnetworks](https://user-images.githubusercontent.com/46768393/66180373-cd65c000-e63a-11e9-9147-d762c44718fc.jpg)
=======
![datacollection](https://user-images.githubusercontent.com/46768393/66180587-92b05780-e63b-11e9-8730-56114e681a05.jpg)

**Q: What is this?**
>>>>>>> ac07d0385ed7679f492d73cf785c860a27c5cdbb

**A: The specifications for the overall program. The recipe.**

**To keep things clean, there are folders for your Jupyter Notebook files and the resources files**

# **Overall Blueprint:**

_This is a very general overall outline of what needs to be done._

Python: Grab data from APIs, clean data, store it into MongoDB. 

Python/Pandas: Rescale the data.

Python or Jupyter Notebook (Keras): Feed data into AI. AI will then poop out results.

Put results into DB.

Python: Run Flask server, create API that allows access to AI results and host website on Heroku or AWS or google cloud. Honestly, if there&#39;s time just learn to port Flask over to Django.

Javascript and HTML: Retrieve AI results and visually show the results.

# **More detailed, specific instructions:**

Each of the steps below may require data from the previous step. If that&#39;s the case then just use fake data until the real data is available.

The steps below, as you will see, are purposefully designed to take data frames of arbitrary column length. Each of the parts should be able to work with any amount of columns with the exception of the first column being the date and the last column being the training data (to be added in a later step).

This will give us the flexibility of simply changing the data to whatever we want, have it be automatically scaled, and then used to train the AI. 



# **Data Collection:**

Find stock market data since 1980s or 1990s (CSV, API, whatever) for the big Indexes (Dow Jones, and S&amp;P 500). Daily data would be the best. Daily would be the one we use for this project but hourly can be something we use later.

Clean the data so that we can have at least have the following information for each day (Using numbers from MSFT as an example):

Open 141.01

High 141.65

Low 138.25

(IF these three points of data above is not available, then just the closing price or whatever price IS available, is fine)

Mkt cap 1.06T

P/E ratio 27.54

Div yield 1.46%



| Date | Price(or closing price) | High | Low | MktCap | P/E Ratio | Div Yield | Daily Volume |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01/01/2001 | 78 | 90 | 20 | 9393 | 32 | 2 | 100000 |

In the pandas, each row should look something like this, above.

If you can't get the other stuff, that's fine, but every single dataframe must be at least:

| Date | Price |
| --- | --- |
| 01/01/2001 | 100 |

Clean the data put it into, make sure they&#39;re all in numbers/float format. Replace all weird data like &quot;NaN&quot; or &quot;N/A&quot; or whatever, with 0 or figure out a good way to change it into a number that's a good representation of what it's about.

Store this data into Mongodb.

The data should be stored in the database named the company's name.
The collection should be named cleaned.

For example, if you've cleaned Google's data, it should be saved to a databased called **google** and a collection named **cleaned**


# **Data Scaling:**

This data must then be compressed into a format that the neural network can process. This means all data should be turned into some number between 0 to 1.

For example, if we are look at data from 9/3/2015 and the price was 100, we will find the maximum and minimum price from the last 365 days to determine the range of the scale.

Our current price: 100

Max price from 365d range: 150

Min price from 365d range: 50

Our **scaled price data** : 0.5

_Outliers_: To account for outliers, data that exceeds 3 standard deviations of the 365d data set should just be set to 1 or 0. 

_What to do:_

Create Jupyter notebook or python code that can:

1) Grab the scraped data from MongoDB and put it into a dataframe.

2) Create a function in python that can take a data frame of unknown columns and process all the columns. The first column which will be the date, all other columns should already be in numerical/float format.

3) Scale the data by taking the min and max of data 365 days before the row being processed.

4) Saved the scaled data into the MongoDB database.


Store this data into Mongodb.

The data should be stored in the database named the company's name.
The collection should be named cleaned.

For example, if you've cleaned Google's data, it should be saved to a databased called **google** and a collection named **scaled**

# **Generating training data:**

Considerations for RNN and future TODOs (skip if not interested, not a do-able requirement for this project):

_IF NO RNN: Once the data has been cleaned and scaled, it&#39;s time to generate training data. We will need to decide what is the &quot;range&quot; of data we will want the AI to consider. Should the AI look at what happened the last day, last week or last month?_

_This must be decided on how much time we&#39;re giving the AI to think. The idea is &quot;Would it be a good idea to buy or sell right now if the next opportunity we have to buy or sell will be a day, week, or month from now?&quot;_

_For this project, we will just start with 14 day range. In the future, we may have separate AI&#39;s that use 1 month data, 1 day data, 1 year data, etc._

**Instructions:**

## Part 1:
Create a function that takes 2 parameters: a dataframe and a number.
The number represents how many days ahead to look. 
The function will take in the data frame, and append X columns to it (based on the number) with the data from each of the previous day being added.

| Date | Price | 1 Day Ago | 2 Day Ago | 3 Day Ago | 4 Day Ago |
| --- | --- | --- | --- | --- | --- |
| 01/01/2001 | 100 | 25 | 75 | 22 | 55 |



## Part 2:

Create another function that that will take a dataframe of unknown columns and size, and add a new column to it. The new column will look at the closing price of that day, and compare it to the closing price of a date 14 days in the future.

If the future date&#39;s price is higher, then the row in the new column should be 1.

Caution: 14 days away may not exist due to the market closed on weekends. In that case, just look up the next available day. Or just count current index + 14. 

When that data no longer exists because you&#39;re at the 13th date from the last day available in the data frame, just stop and splice off/throw away the rest of the data (the last 13 days).

Store this data into Mongodb.

The data should be stored in the database named the company's name.
The collection should be named cleaned.

For example, if you've cleaned Google's data, it should be saved to a databased called **google** and a collection named **train**

# **The Neural Net:**

The AI NN will be a standard feed forward NN that will be fed data from the previous task.



The neural net will be automatically scaling. The width, height, and depth (total number of layers), will be equal to the number of inputs/features available (which is the length of the number of columns available minus two because the first row is the date, the last row is the testing data column)


The AI will output its answer. Take this array/series data and add it to the last row of **of the original data** , the one that&#39;s unscaled. Map everything in this last column into &quot;buy&quot; and &quot;sell&quot; as replacements for 1 and 0 respectively.

Append a new column to the column to represent the AI&#39;s ID. And we do this because…

**Optional:** Redo the above but change the parameters of the NN by adding an extra layer or something and in the final data frame, change the ID.

**TODO:** figure out someway to add a description to each AI&#39;s ID. Maybe a new table with two rows: AI ID, and a description of the type of data the AI was looking at, a description of its NN architecture.

Even better, if there&#39;s enough time towards the end of the class, we should create new training data and scaled data where the AI looks at 31 days of data instead of 14 or only yesterday&#39;s data.

# **Front end:**

Create the standard file structure of flask. (app.py, static/js/css folders, basic template for routes)

Create an index "/" route that has a dragdown list of all of the AIs.

Create a route that would take in something like FerengAI.com/<ai_id>/ and return a JSON that has the AI's ID, AI's Description, what stock the AI was trained on, what stock the AI was applied to, and an array of all the dates and decision the AI made.
