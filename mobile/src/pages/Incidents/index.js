import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';

export default function Incidents() {

  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  function navigateToDetails(incident){
    navigation.navigate('Details', { incident });
  }

  async function refreshIncidents(){
    if(loading){
      return;
    }
    setRefreshing(true);
    setLoading(true);

    try{
      const response = await api.get('incidents');
      setIncidents(response.data);
      setPage(2);
      setTotal(parseInt(response.headers['x-total-count']));
    } catch(err) {
      Alert.alert('Error', 'Error refreshing campaigns. Please try again.');
    }

    setLoading(false);
    setRefreshing(false);
  }

  async function loadIncidents(){
    if(loading){
      return;
    }

    if(total > 0 && incidents.length === total){
      return;
    }

    setLoading(true);

    try{
      const response = await api.get('incidents', {
        params: { page }
      });
      setIncidents([...incidents, ...response.data]);
      setTotal(parseInt(response.headers['x-total-count']));
      setPage(page + 1);
    } catch(err) {
      Alert.alert('Erro', `Falha ao buscar casos: ${err}`);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{total} campaigns</Text>
        </Text>
      </View>

      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.description}>Choose one of the following campaigns and save the day.</Text>

      <FlatList 
        data={incidents}
        keyExtractor={incident => incident.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => refreshIncidents()}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        style={styles.incidentList}
        renderItem={({ item: incident}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>NGO:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>


            <Text style={styles.incidentProperty}>CAMPAIGN:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>


            <Text style={styles.incidentProperty}>VALUE:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetails(incident)}>
              <Text style={styles.detailsButtonText}>Show details</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
          </View>
        )}
      />
      
    </View>
  )
}