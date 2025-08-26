import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: "List New Property",
      description: "Add a new rental property to your portfolio",
      icon: "Plus",
      color: "bg-primary/10 text-primary",
      action: "primary"
    },
    {
      id: 2,
      title: "Screen Tenants",
      description: "Review pending applications and background checks",
      icon: "Users",
      color: "bg-secondary/10 text-secondary",
      action: "secondary",
      badge: "3 pending"
    },
    {
      id: 3,
      title: "Collect Rent",
      description: "Send payment reminders and track collections",
      icon: "CreditCard",
      color: "bg-success/10 text-success",
      action: "success"
    },
    {
      id: 4,
      title: "Schedule Maintenance",
      description: "Coordinate repairs and property upkeep",
      icon: "Wrench",
      color: "bg-warning/10 text-warning",
      action: "warning",
      badge: "2 urgent"
    },
    {
      id: 5,
      title: "Market Analysis",
      description: "View rental market trends and pricing insights",
      icon: "TrendingUp",
      color: "bg-accent/10 text-accent",
      action: "accent"
    },
    {
      id: 6,
      title: "Generate Reports",
      description: "Create financial and performance reports",
      icon: "FileText",
      color: "bg-purple-100 text-purple-600",
      action: "outline"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "payment",
      message: "Rent payment received from Sarah Johnson",
      time: "2 hours ago",
      icon: "DollarSign",
      color: "text-success"
    },
    {
      id: 2,
      type: "application",
      message: "New application for Downtown Apartment",
      time: "4 hours ago",
      icon: "FileText",
      color: "text-primary"
    },
    {
      id: 3,
      type: "maintenance",
      message: "Maintenance request completed at Penthouse Suite",
      time: "1 day ago",
      icon: "CheckCircle",
      color: "text-success"
    },
    {
      id: 4,
      type: "message",
      message: "Message from Michael Chen about lease renewal",
      time: "2 days ago",
      icon: "MessageCircle",
      color: "text-secondary"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
            <p className="text-sm text-text-secondary">Common tasks and shortcuts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              className="relative p-4 border border-border rounded-lg text-left smooth-transition hover:shadow-elevation hover:border-primary/20 group"
            >
              {action?.badge && (
                <span className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs px-2 py-1 rounded-full">
                  {action?.badge}
                </span>
              )}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action?.color} group-hover:scale-110 smooth-transition`}>
                <Icon name={action?.icon} size={24} />
              </div>
              <h4 className="text-sm font-semibold text-text-primary mb-1">{action?.title}</h4>
              <p className="text-xs text-text-secondary">{action?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
            <p className="text-sm text-text-secondary">Latest updates from your properties</p>
          </div>
          <Button variant="ghost" size="sm" iconName="ExternalLink">
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {recentActivities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted smooth-transition">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${activity?.color}`}>
                <Icon name={activity?.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">{activity?.message}</p>
                <p className="text-xs text-text-secondary mt-1">{activity?.time}</p>
              </div>
              <Button variant="ghost" size="sm" iconName="ChevronRight" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-6 pt-6 border-t border-border">
          <Button variant="outline" size="sm" iconName="Bell">
            Manage Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;