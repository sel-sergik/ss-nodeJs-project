//create the nodejs database and connect to it
var db = connect('127.0.0.1:27017/nodejs');

print('* Database nodejs created');

//create the cities collection and add documents to it
db.cities.insert( { name: 'Brest', country: 'Belarus', capital: false, location: { lat: 52.0976, long: 23.7341 }} );
db.cities.insert( { name: 'Gomel', country: 'Belarus', capital: false, location: { lat: 52.4412, long: 30.9878 }} );
db.cities.insert( { name: 'Grodno', country: 'Belarus', capital: false, location: { lat: 53.6694, long: 23.8131 }} );
db.cities.insert( { name: 'Vitebsk', country: 'Belarus', capital: false, location: { lat: 55.1848, long: 30.2016 }} );
db.cities.insert( { name: 'Mogilev', country: 'Belarus', capital: false, location: { lat: 52.097621, long: 23.734050 }} );
db.cities.insert( { name: 'Minsk', country: 'Belarus', capital: true, location: { lat: 53.9007, long: 30.3314 }} );
db.cities.insert( { name: 'Moscow', country: 'Russia', capital: true, location: { lat: 55.7558, long: 37.6173 }} );
db.cities.insert( { name: 'Saratov', country: 'Russia', capital: false, location: { lat: 51.5924, long: 45.9608 }} );
db.cities.insert( { name: 'Liverpool', country: 'United Kingdom', capital: false, location: { lat: 53.4084, long: 2.9916 }} );

print('* Cities created');