#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
import sqlalchemy


# In[ ]:


#example csv at https://docs.google.com/spreadsheets/d/1QhjE27TJ-AiFbC4pea39ajy_l-iAAVDUKoBIDMpoMFE/edit?usp=sharing
data = pd.read_csv('example_data.csv')
display = pd.read_csv('example_display.csv')

#parse a given date to datetime
data['date'] = pd.to_datetime(data['date'], infer_datetime_format=True) 

#ignore everthing that's not a filter, metric or date
filters = [x for x in data.columns if x.startswith('filter_')] 
metrics = [x for x in data.columns if x.startswith('metric_')]
filtered_data = data[['date'] + filters + metrics]


# In[ ]:


#setup connection
host = "goodcitylife.org"
user = "dquercia_twin"
password = ""
database = "dquercia_nokiatwin"
data_table ="data"
display_table="display"
engine = sqlalchemy.create_engine('mysql+mysqlconnector://'+user+':'+password+'@'+host+'/'+database)

#write new database to db
#OVERWRITES EXISTING TABLES
filtered_data.to_sql(con=engine, name=data_table, if_exists='replace',dtype={"date": sqlalchemy.types.DateTime()})
display.to_sql(con=engine,name=display_table,if_exists='replace')

