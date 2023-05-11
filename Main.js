import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

const Main = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInput = async () => {
    try {
        const userInput = "Query:" + input
        const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You: ${userInput}\nAI:`,
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["You:"],
      });
      setOutput(response.data.choices[0].text);
    } catch (error) {
        console.log(error);
    }

    setInput('');
  }  

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Alfred - Personal Assitant</Text>        

          <ScrollView style={{flexGrow:10}}>
        <Text style={styles.loremIpsum}>
            Alfred, provides real time answers to your queries.Example: what is today's weather in my city? today's stock price of Microsoft
            ? who is Alan Turing? and much more.
          </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    editable
                    style={styles.input}
                    placeholder="Type your query here"
                    onChangeText={(text) => setInput(text)}
                    value={input}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleInput}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
                <View style={styles.outputContainer}>
                    <ScrollView>
                    <Text multiline style={styles.output}>{"Alfred:"+output}</Text>
                    </ScrollView>
                </View>
            </View>
            </ScrollView>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    chatContainer: {
      width: '90%',
      height: '70%',
      borderWidth: 1,
      borderRadius: 10,
      overflow: 'hidden',
    },
    inputContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#F2F2F2',
    },
    input: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    sendButton: {
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 20,
    },
    sendButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    outputContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    output: {
      fontSize: 16,
    },
    loremIpsum: {
      position: "relative",
      fontFamily: "roboto-700",
      color: "#121212",
      fontSize: 15,
      textAlign: "justify"
    },
  });
  
  export default Main;