
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Activity, Settings, TrendingUp } from 'lucide-react';
import EquipmentCard from './EquipmentCard';
import AlertsPanel from './AlertsPanel';
import ChartsPanel from './ChartsPanel';
import ReportsPanel from './ReportsPanel';
import { useSupabaseData } from '../hooks/useSupabaseData';

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(true);
  const { equipmentData, alerts, isLoading, error, isSupabaseConfigured } = useSupabaseData();

  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical').length;
  const warningAlerts = alerts.filter(alert => alert.severity === 'warning').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-semibold mb-2">Carregando dados dos sensores...</h2>
          <p className="text-slate-400">Conectando com o banco de dados</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Erro ao carregar dados</h2>
          <p className="text-slate-400 mb-4">
            {error instanceof Error ? error.message : 'Erro desconhecido'}
          </p>
          <p className="text-sm text-slate-500">
            Verifique a conexão com o banco de dados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Sistema de Monitoramento Industrial</h1>
            <p className="text-slate-400 mt-2">Prevenção Preditiva de Falhas - Hermes Reply</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant={isConnected ? "default" : "destructive"} className="px-3 py-1">
              <Activity className="w-4 h-4 mr-2" />
              {isConnected ? 'Conectado' : 'Desconectado'}
            </Badge>
            
            {criticalAlerts > 0 && (
              <Alert className="border-red-500 bg-red-500/10 text-red-400 p-3">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="ml-2">
                  {criticalAlerts} alerta(s) crítico(s) ativo(s)
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-slate-200">Equipamentos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">
                {equipmentData.length}
              </div>
              <p className="text-slate-400 text-sm">máquinas monitoradas</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-slate-200">Alertas Críticos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">
                {criticalAlerts}
              </div>
              <p className="text-slate-400 text-sm">necessitam ação imediata</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-slate-200">Avisos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">
                {warningAlerts}
              </div>
              <p className="text-slate-400 text-sm">monitoramento preventivo</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-slate-200">Eficiência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">
                {criticalAlerts === 0 ? '98.5%' : warningAlerts > 0 ? '94.2%' : '89.1%'}
              </div>
              <p className="text-slate-400 text-sm">últimas 24h</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">
              <Activity className="w-4 h-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-slate-700">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alertas ({alerts.length})
            </TabsTrigger>
            <TabsTrigger value="charts" className="data-[state=active]:bg-slate-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Gráficos
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-slate-700">
              <Settings className="w-4 h-4 mr-2" />
              Relatórios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {equipmentData.map((equipment) => (
                <EquipmentCard 
                  key={equipment.id} 
                  equipment={equipment}
                  alerts={alerts.filter(alert => alert.equipmentId === equipment.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsPanel alerts={alerts} />
          </TabsContent>

          <TabsContent value="charts">
            <ChartsPanel equipmentData={equipmentData} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsPanel equipmentData={equipmentData} alerts={alerts} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
