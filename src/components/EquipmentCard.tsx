
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface EquipmentCardProps {
  equipment: any;
  alerts: any[];
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, alerts }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-5 h-5" />;
      case 'warning': return <AlertCircle className="w-5 h-5" />;
      case 'critical': return <AlertTriangle className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical').length;
  const warningAlerts = alerts.filter(alert => alert.severity === 'warning').length;

  return (
    <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">{equipment.name}</CardTitle>
          <div className={`flex items-center gap-2 ${getStatusColor(equipment.status)}`}>
            {getStatusIcon(equipment.status)}
            <span className="capitalize font-medium">{equipment.status}</span>
          </div>
        </div>
        <p className="text-slate-400 text-sm">{equipment.location}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Alertas */}
        {(criticalAlerts > 0 || warningAlerts > 0) && (
          <div className="flex gap-2">
            {criticalAlerts > 0 && (
              <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500">
                {criticalAlerts} Crítico(s)
              </Badge>
            )}
            {warningAlerts > 0 && (
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500">
                {warningAlerts} Aviso(s)
              </Badge>
            )}
          </div>
        )}

        {/* Sensores */}
        <div className="space-y-3">
          {/* Temperatura */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-slate-300">Temperatura</span>
              <span className="text-sm font-medium text-white">
                {equipment.sensors.temperature}°C
              </span>
            </div>
            <Progress 
              value={(equipment.sensors.temperature / 100) * 100} 
              className="h-2 bg-slate-700"
            />
          </div>

          {/* Vibração */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-slate-300">Vibração</span>
              <span className="text-sm font-medium text-white">
                {equipment.sensors.vibration} Hz
              </span>
            </div>
            <Progress 
              value={(equipment.sensors.vibration / 50) * 100} 
              className="h-2 bg-slate-700"
            />
          </div>

          {/* RPM */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-slate-300">Rotação</span>
              <span className="text-sm font-medium text-white">
                {equipment.sensors.rpm} RPM
              </span>
            </div>
            <Progress 
              value={(equipment.sensors.rpm / 3000) * 100} 
              className="h-2 bg-slate-700"
            />
          </div>
        </div>

        {/* Última atualização */}
        <div className="text-xs text-slate-400 pt-2 border-t border-slate-700">
          Última atualização: {new Date().toLocaleTimeString('pt-BR')}
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;
