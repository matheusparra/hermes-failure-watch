
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ChartsPanelProps {
  equipmentData: any[];
}

const ChartsPanel: React.FC<ChartsPanelProps> = ({ equipmentData }) => {
  // Gerar dados históricos simulados para os gráficos
  const generateHistoricalData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      data.push({
        time: time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        temp1: Math.random() * 20 + 70,
        temp2: Math.random() * 15 + 65,
        temp3: Math.random() * 25 + 75,
        vibration1: Math.random() * 10 + 15,
        vibration2: Math.random() * 8 + 12,
        vibration3: Math.random() * 12 + 18,
        rpm1: Math.random() * 200 + 1800,
        rpm2: Math.random() * 150 + 1750,
        rpm3: Math.random() * 180 + 1820,
      });
    }
    
    return data;
  };

  const historicalData = generateHistoricalData();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Análise de Tendências</h2>
      </div>

      {/* Gráfico de Temperatura */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Temperatura (°C) - Últimas 24h</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }} 
              />
              <Line type="monotone" dataKey="temp1" stroke="#EF4444" strokeWidth={2} name="Equipamento 1" />
              <Line type="monotone" dataKey="temp2" stroke="#F59E0B" strokeWidth={2} name="Equipamento 2" />
              <Line type="monotone" dataKey="temp3" stroke="#10B981" strokeWidth={2} name="Equipamento 3" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Vibração */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Vibração (Hz) - Últimas 24h</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }} 
              />
              <Area type="monotone" dataKey="vibration1" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Equipamento 1" />
              <Area type="monotone" dataKey="vibration2" stackId="2" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} name="Equipamento 2" />
              <Area type="monotone" dataKey="vibration3" stackId="3" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} name="Equipamento 3" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de RPM */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Rotação (RPM) - Últimas 24h</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }} 
              />
              <Line type="monotone" dataKey="rpm1" stroke="#F97316" strokeWidth={2} name="Equipamento 1" />
              <Line type="monotone" dataKey="rpm2" stroke="#84CC16" strokeWidth={2} name="Equipamento 2" />
              <Line type="monotone" dataKey="rpm3" stroke="#EC4899" strokeWidth={2} name="Equipamento 3" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsPanel;
