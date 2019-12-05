/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import axios from 'axios';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Button
          title="pick file"
          onPress={async () => {
            try {
              const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
              });
              console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size,
              );
              let url = res.uri;
              const split = url.split('/');
              const name = split.pop();
              const inbox = split.pop();
              const realPath = `${RNFS.DocumentDirectoryPath}${inbox}/${name}`;
              const BaseUrl = 'http://test.sequenzainc.com';
              console.log(realPath);
              // let form = new FormData();
              // form.append('file_0', realPath);
              var photo = {
                uri: res.uri,
                type: 'image/jpeg',
                name: 'photo.jpg',
              };

              var body = new FormData();
              body.append('file_0', photo);
              const headers = {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                  Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImZpcnN0TmFtZSI6IlRlc3QiLCJsYXN0TmFtZSI6Ik1hcmtldHBsYWNlIFZlbmRvciBUZWNoIiwidXNlck5hbWUiOiJ0ZXN0bWFya2V0cGxhY2V2ZW5kb3J0ZWNoIiwiZW1haWwiOiJqYWNvYmJlYXNsZXkrdGVzdG1hcmtldHBsYWNldmVuZG9ydGVjaEBnbWFpbC5jb20iLCJpc0FjdGl2ZSI6dHJ1ZSwiY3VzdG9tZXJJZCI6MCwidGVjaG5pY2lhbklkIjo1MSwidmVuZG9ySWQiOjAsImlzQ3VzdG9tZXJBY3RpdmUiOm51bGwsImlzVGVjaG5pY2lhbkFjdGl2ZSI6dHJ1ZSwiaXNWZW5kb3JBY3RpdmUiOm51bGwsInJvbGVzIjpbeyJ0eXBlIjoiVEVDSE5JQ0lBTiJ9XSwiY29udHJhY3RzIjpbeyJjb250cmFjdElkIjoxNSwiaXNBY2NlcHRlZCI6dHJ1ZX0seyJjb250cmFjdElkIjoxNiwiaXNBY2NlcHRlZCI6dHJ1ZX0seyJjb250cmFjdElkIjoxNywiaXNBY2NlcHRlZCI6dHJ1ZX0seyJjb250cmFjdElkIjoxOCwiaXNBY2NlcHRlZCI6dHJ1ZX1dLCJpYXQiOjE1NzU0NjY0MzEsImV4cCI6MTU3NTUyNDAzMX0.RrIOpwlaorpsFuwhhsPPGEv0dalMq5vgzPdcAN1eFKQ',
                },
              };
              axios
                .post(
                  BaseUrl + '/api/technician/orders/message/attachment/' + 271,
                  body,
                  headers,
                )
                .then(response => {
                  console.log(response);
                })
                .catch(err => {
                  console.log(err.response);
                });
            } catch (err) {
              if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
              } else {
                throw err;
              }
            }
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
