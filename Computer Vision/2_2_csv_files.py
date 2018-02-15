import csv
 
myData = [["first_name", "second_name", "Grade"],
          ['Alex', 'Brian', 'A'],
          ['Tom', 'Smith', 'B']]

with open('some.csv', 'w') as f:
    writer = csv.writer(f, lineterminator='\n')
    # writer.writerow(list)                       # for 1D list
    writer.writerows(myData)                    # for 2D array