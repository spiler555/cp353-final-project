from time import strftime

time = strftime('%I:%M:%S %p {0} %d {1} %m {2} %Y').format('วันที่','เดือน','ปี')

print(time)