# EZmongo.
Because I got sick of having to write the same lines of code over and over.

Use this in your JupyterNotebook file inside the folder "jupyter" or you can copy and paste that file "ezmongo.py" elsewhere and use it there.

## How to get data from our mongoDB
```
import ezmongo
my_dataframe = ezmongo.get_data("GOOG","cleaned")
```

Import the ezmongo module and use ezmongo.get_data() function. It will return a dataframe. 
No error checking here because I got lazy so make sure the data exists or you'll get a crash like:
```
 ['_id'] not found in axis
```
 
## How to upload data 
```
import ezmongo
ezmongo.set_data(my_df, 'MSFT', 'train')
```

It's basically:

ezmongo.set_data(  the_dataframe  ,  name_of_the_company  ,  type_of_data_in_the_dataframe  )
