import { useState } from 'react';
import {
Alert,
FlatList,
StyleSheet,
Text,
TextInput,
TouchableOpacity,
View,
} from 'react-native';

// CORRECTION (Error 1 - import): the Picker component must be imported from a
// package that is actually installed in the project. The supplied file imported
// it from '@expo/ui/community/picker', which is not part of the supplied
// project, so the module could not be resolved and the app would not start.
// Install it with: npx expo install @react-native-picker/picker
import { Picker } from '@react-native-picker/picker';

type Album = {
id: string;
title: string;
artist: string;
year: string;
genre: string;
rating: string;
};

const genres: string[] = [
'Alternative',
'Blues',
'Classical',
'Country',
'Electronic',
'Hip Hop',
'Jazz',
'Metal',
'Pop',
'R&B',
'Reggae',
'Rock',
'Soundtrack',
'Soul',
'Other',
];

const MIN_TEXT_LENGTH = 2;
const MAX_TITLE_LENGTH = 50;
const MAX_ARTIST_LENGTH = 50;
const MIN_YEAR = 1900;
const MAX_RATING = 5;

export default function App() {
const [title, setTitle] = useState<string>('');
const [artist, setArtist] = useState<string>('');
const [year, setYear] = useState<string>('');
const [genre, setGenre] = useState<string>('');
const [rating, setRating] = useState<string>('');

const [albums, setAlbums] = useState<Album[]>([]);

const validateForm = (): boolean => {
if (!title.trim()) {
Alert.alert('Validation Error', 'Please enter an album title.');
return false;
}

// CORRECTION (Error 2 - logic): the original condition used && between
// "length < MIN_TEXT_LENGTH" and "length > MAX_TITLE_LENGTH". A length can
// never be smaller than 2 AND larger than 50, so this block never ran.
if (
title.trim().length < MIN_TEXT_LENGTH ||
title.trim().length > MAX_TITLE_LENGTH
) {
Alert.alert(
'Validation Error',
`Album title must contain between ${MIN_TEXT_LENGTH} and ${MAX_TITLE_LENGTH} characters.`
);
return false;
}

if (!artist.trim()) {
Alert.alert('Validation Error', 'Please enter an artist name.');
return false;
}

// CORRECTION (Error 3 - logic): same && / || mistake for the artist name.
if (
artist.trim().length < MIN_TEXT_LENGTH ||
artist.trim().length > MAX_ARTIST_LENGTH
) {
Alert.alert(
'Validation Error',
`Artist name must contain between ${MIN_TEXT_LENGTH} and ${MAX_ARTIST_LENGTH} characters.`
);
return false;
}

if (!year.trim()) {
Alert.alert('Validation Error', 'Please enter an album release year.');
return false;
}

const numericYear = Number(year);

if (!Number.isInteger(numericYear)) {
Alert.alert('Validation Error', 'Album year must be a whole number.');
return false;
}

const currentYear = new Date().getFullYear();

// CORRECTION (Error 4 - logic/validation): the original code only tested
// numericYear < MIN_YEAR, even though the message promised a range up to
// currentYear. Years in the future were therefore accepted.
if (numericYear < MIN_YEAR || numericYear > currentYear) {
Alert.alert(
'Validation Error',
`Album year must be between ${MIN_YEAR} and ${currentYear}.`
);
return false;
}

if (!genre) {
Alert.alert('Validation Error', 'Please select a genre.');
return false;
}

if (!rating.trim()) {
Alert.alert('Validation Error', 'Please enter a rating.');
return false;
}

const numericRating = Number(rating);

if (!Number.isInteger(numericRating)) {
Alert.alert('Validation Error', 'Rating must be a whole number.');
return false;
}

// CORRECTION (Error 5 - logic/validation): the original code only tested
// numericRating < 1, so the upper limit (MAX_RATING) was never enforced and
// values such as 99 were accepted.
if (numericRating < 1 || numericRating > MAX_RATING) {
Alert.alert(
'Validation Error',
`Rating must be between 1 and ${MAX_RATING}.`
);
return false;
}

return true;
};

const handleSave = () => {
if (!validateForm()) {
return;
}

// CORRECTION (Error 6 - TypeScript): year and rating are declared as string
// in the Album type above, but the original object stored Number(year) and
// Number(rating), which produced a type error. The declared type is correct,
// so the values are stored as strings.
const temporaryAlbum: Album = {
id: Date.now().toString(),
title: title.trim(),
artist: artist.trim(),
year: year.trim(),
genre: genre,
rating: rating.trim(),
};

// CORRECTION (Error 7 - state/logic): the original code called
// setAlbums([temporaryAlbum]), which replaced the whole collection with a
// single-item array. A functional update appends the new album instead.
setAlbums((currentAlbums) => [...currentAlbums, temporaryAlbum]);

setTitle('');
setArtist('');
setYear('');
setGenre('');
setRating('');
};

const handleDelete = (id: string) => {
// CORRECTION (Error 8 - logic/deleting records): the original filter kept
// the album that was being deleted and removed all the others. It must keep
// every album whose id is NOT the id being deleted.
setAlbums((currentAlbums) =>
currentAlbums.filter((album) => album.id !== id)
);
};

const renderAlbum = ({ item }: { item: Album }) => (
<View style={styles.albumCard}>
<View style={styles.albumInformation}>
<Text style={styles.albumTitle}>{item.title}</Text>
<Text style={styles.albumArtist}>{item.artist}</Text>
<Text>Year: {item.year}</Text>
<Text>Genre: {item.genre}</Text>
<Text>Rating: {item.rating}/5</Text>
</View>

<TouchableOpacity
style={styles.deleteButton}
onPress={() => handleDelete(item.id)}
>
<Text style={styles.deleteButtonText}>Delete</Text>
</TouchableOpacity>
</View>
);

return (
<View style={styles.container}>
<Text style={styles.heading}>My Album Collection</Text>

<Text style={styles.label}>Album Title</Text>
<TextInput
style={styles.input}
placeholder="Enter album title"
value={title}
onChangeText={setTitle}
/>

<Text style={styles.label}>Artist</Text>
<TextInput
style={styles.input}
placeholder="Enter artist name"
value={artist}
onChangeText={setArtist}
/>

<Text style={styles.label}>Year</Text>
<TextInput
style={styles.input}
placeholder="Enter release year"
value={year}
onChangeText={setYear}
keyboardType="numeric"
/>

<Text style={styles.label}>Genre</Text>
{/* CORRECTION (Error 9 - state binding): selectedValue was bound to
`title`, so the picker never displayed the selected genre. */}
<Picker
selectedValue={genre}
onValueChange={(value) => setGenre(value)}
>
<Picker.Item label="Select a genre..." value="" />
{genres.map((item) => (
// CORRECTION (Error 10 - form input): the original code used
// value={genre}, so every option carried the same value. Each option
// must carry its own genre.
<Picker.Item key={item} label={item} value={item} />
))}
</Picker>

<Text style={styles.label}>Rating</Text>
<TextInput
style={styles.input}
placeholder="Enter rating from 1 to 5"
value={rating}
onChangeText={setRating}
keyboardType="numeric"
/>

<TouchableOpacity style={styles.addButton} onPress={handleSave}>
<Text style={styles.addButtonText}>Add to Favourites</Text>
</TouchableOpacity>

<Text style={styles.collectionHeading}>
My Favourite Albums ({albums.length})
</Text>

{/* CORRECTION (Error 11 - FlatList): keyExtractor used item.title, which
is not guaranteed to be unique. The unique id must be used. */}
<FlatList
data={albums}
keyExtractor={(item) => item.id}
renderItem={renderAlbum}
ListEmptyComponent={
<Text style={styles.emptyMessage}>
No albums have been added yet.
</Text>
}
/>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
paddingTop: 50,
backgroundColor: '#f5f5f5',
},
heading: {
fontSize: 26,
fontWeight: 'bold',
marginBottom: 20,
textAlign: 'center',
},
label: {
fontSize: 16,
fontWeight: '600',
marginTop: 8,
marginBottom: 4,
},
input: {
backgroundColor: '#ffffff',
borderWidth: 1,
borderColor: '#cccccc',
borderRadius: 6,
paddingHorizontal: 12,
paddingVertical: 10,
fontSize: 16,
},
addButton: {
backgroundColor: '#2e7d32',
borderRadius: 6,
paddingVertical: 12,
marginTop: 15,
marginBottom: 20,
},
addButtonText: {
color: '#ffffff',
fontSize: 16,
fontWeight: 'bold',
textAlign: 'center',
},
collectionHeading: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 10,
},
albumCard: {
backgroundColor: '#ffffff',
borderRadius: 8,
padding: 15,
marginBottom: 10,
borderWidth: 1,
borderColor: '#dddddd',
},
albumInformation: {
marginBottom: 10,
},
albumTitle: {
fontSize: 19,
fontWeight: 'bold',
},
albumArtist: {
fontSize: 16,
color: '#555555',
marginBottom: 6,
},
deleteButton: {
backgroundColor: '#c62828',
borderRadius: 6,
paddingVertical: 10,
},
deleteButtonText: {
color: '#ffffff',
fontSize: 15,
fontWeight: 'bold',
textAlign: 'center',
},
emptyMessage: {
textAlign: 'center',
color: '#777777',
marginTop: 20,
fontStyle: 'italic',
},
});
