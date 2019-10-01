# How to use ezmongo:

## Getting data from mongo

import ezmongo
my_dataframe = ezmongo.get_data("AMZN","cleaned")

Be sure to import pandas! No error checkers so it'll crash if something doesn't exist. I think. 

## Uploading new data to mongo

import ezmongo
ezmongo.set_data(my_dataframe, "GOOG", "cleaned")