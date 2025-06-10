
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';

interface ReportsPanelProps {
  equipmentData: any[];
  alerts: any[];
}

const ReportsPanel: React.FC<ReportsPanelProps> = ({ equipmentData, alerts }) => {
  // Dados para gráfico de falhas por equipamento
  const failuresByEquipment = [
    { name: 'Equipamento 1', falhas: 3, manutencoes: 12 },
    { name: 'Equipamento 2', falhas: 1, manutencoes: 8 },
    { name: 'Equipamento 3', falhas: 5, manutencoes: 15 },
  ];

  // Dados para gráfico de tipos de alerta
  const alertTypes = [
    { name: 'Temperatura', value: 45, color: '#EF4444' },
    { name: 'Vibração', value: 30, color: '#F59E0B' },
    { name: 'Rotação', value: 25, color: '#10B981' },
  ];

  const handleExportReport = () => {
    // Simular download de relatório
    console.log('Exportando relatório...');
    // Aqui você implementaria a lógica real de exportação
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Relatórios e Análises</h2>
        <Button onClick={handleExportReport} className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Resumo Executivo */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Resumo Executivo - Últimos 30 dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-green-400">96.2%</div>
              <div className="text-sm text-slate-300">Disponibilidade</div>
            </div>
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">9</div>
              <div className="text-sm text-slate-300">Falhas Detectadas</div>
            </div>
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">35</div>
              <div className="text-sm text-slate-300">Manutenções Preventivas</div>
            </div>
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">R$ 45.2k</div>
              <div className="text-sm text-slate-300">Economia Estimada</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Falhas por Equipamento */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Falhas vs Manutenções por Equipamento</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={failuresByEquipment}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }} 
                />
                <Bar dataKey="falhas" fill="#EF4444" name="Falhas" />
                <Bar dataKey="manutencoes" fill="#10B981" name="Manutenções" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Tipos de Alerta */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Distribuição de Tipos de Alerta</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={alertTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {alertTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Incidentes */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Histórico de Incidentes Críticos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                date: '2024-06-08',
                equipment: 'Equipamento 3',
                issue: 'Superaquecimento detectado',
                severity: 'critical',
                resolution: 'Manutenção preventiva realizada',
                downtime: '2h 15min'
              },
              {
                date: '2024-06-05',
                equipment: 'Equipamento 1',
                issue: 'Vibração excessiva',
                severity: 'warning',
                resolution: 'Ajuste de calibração',
                downtime: '45min'
              },
              {
                date: '2024-06-02',
                equipment: 'Equipamento 2',
                issue: 'Queda de rotação',
                severity: 'warning',
                resolution: 'Lubrificação realizada',
                downtime: '1h 30min'
              }
            ].map((incident, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant={incident.severity === 'critical' ? 'destructive' : 'secondary'}>
                      {incident.severity === 'critical' ? 'Crítico' : 'Aviso'}
                    </Badge>
                    <span className="text-white font-medium">{incident.equipment}</span>
                    <span className="text-slate-400 text-sm">{incident.date}</span>
                  </div>
                  <p className="text-slate-300 mb-1">{incident.issue}</p>
                  <p className="text-slate-400 text-sm">Resolução: {incident.resolution}</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{incident.downtime}</div>
                  <div className="text-slate-400 text-sm">Tempo parado</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPanel;
