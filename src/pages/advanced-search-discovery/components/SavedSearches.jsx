import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SavedSearches = ({ savedSearches, onCreateAlert, onDeleteSearch, onEditSearch }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [alertName, setAlertName] = useState('');
  const [alertFrequency, setAlertFrequency] = useState('daily');

  const handleCreateAlert = () => {
    if (alertName?.trim()) {
      onCreateAlert({
        name: alertName,
        frequency: alertFrequency,
        criteria: 'Current search filters' // This would be actual filter data
      });
      setAlertName('');
      setShowCreateForm(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFrequencyIcon = (frequency) => {
    switch (frequency) {
      case 'instant':
        return 'Zap';
      case 'daily':
        return 'Calendar';
      case 'weekly':
        return 'CalendarDays';
      default:
        return 'Bell';
    }
  };

  const getFrequencyColor = (frequency) => {
    switch (frequency) {
      case 'instant':
        return 'text-accent';
      case 'daily':
        return 'text-primary';
      case 'weekly':
        return 'text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <h3 className="font-brand-semibold text-text-primary">Saved Searches</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCreateForm(!showCreateForm)}
          iconName="Plus"
          iconPosition="left"
        >
          Create Alert
        </Button>
      </div>
      {/* Create Alert Form */}
      {showCreateForm && (
        <div className="bg-muted rounded-lg p-4 mb-4">
          <h4 className="font-brand-medium text-text-primary mb-3">Create Search Alert</h4>
          <div className="space-y-3">
            <Input
              label="Alert Name"
              type="text"
              placeholder="e.g., 2BR in Manhattan under $3000"
              value={alertName}
              onChange={(e) => setAlertName(e?.target?.value)}
            />
            <div>
              <label className="block text-sm font-brand-medium text-text-primary mb-2">
                Notification Frequency
              </label>
              <select
                value={alertFrequency}
                onChange={(e) => setAlertFrequency(e?.target?.value)}
                className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="instant">Instant (as they're listed)</option>
                <option value="daily">Daily digest</option>
                <option value="weekly">Weekly summary</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleCreateAlert}
                className="brand-gradient text-white"
              >
                Create Alert
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Saved Searches List */}
      <div className="space-y-3">
        {savedSearches?.length > 0 ? (
          savedSearches?.map((search) => (
            <div
              key={search?.id}
              className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted smooth-transition"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-brand-medium text-text-primary truncate">
                    {search?.name}
                  </h4>
                  <div className={`flex items-center gap-1 ${getFrequencyColor(search?.frequency)}`}>
                    <Icon name={getFrequencyIcon(search?.frequency)} size={14} />
                    <span className="text-xs capitalize">{search?.frequency}</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary truncate">
                  {search?.criteria}
                </p>
                <div className="flex items-center gap-4 mt-1 text-xs text-text-secondary">
                  <span>Created: {formatDate(search?.createdAt)}</span>
                  <span>Last alert: {formatDate(search?.lastAlert)}</span>
                  {search?.newResults > 0 && (
                    <span className="text-accent font-brand-medium">
                      {search?.newResults} new results
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-1 ml-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditSearch(search?.id)}
                  className="h-8 w-8"
                >
                  <Icon name="Edit2" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteSearch(search?.id)}
                  className="h-8 w-8 text-error hover:text-error"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Bell" size={20} className="text-text-muted" />
            </div>
            <h4 className="font-brand-medium text-text-primary mb-1">No saved searches</h4>
            <p className="text-sm text-text-secondary">
              Create alerts to get notified about new properties matching your criteria.
            </p>
          </div>
        )}
      </div>
      {/* Search Tips */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="Lightbulb" size={14} className="text-warning mt-0.5" />
          <div>
            <h5 className="text-sm font-brand-medium text-text-primary mb-1">Pro Tips</h5>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Set instant alerts for competitive markets</li>
              <li>• Use specific location filters for better results</li>
              <li>• Save multiple searches for different scenarios</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedSearches;