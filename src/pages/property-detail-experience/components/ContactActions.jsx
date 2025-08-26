import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactActions = ({ property, owner }) => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedTourType, setSelectedTourType] = useState('virtual');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const tourTypes = [
    { id: 'virtual', label: 'Virtual Tour', icon: 'Video', description: 'Live video walkthrough' },
    { id: 'inPerson', label: 'In-Person Tour', icon: 'MapPin', description: 'Visit the property' },
    { id: 'selfGuided', label: 'Self-Guided', icon: 'Key', description: 'Tour at your own pace' }
  ];

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleSendMessage = () => {
    // Mock message sending
    console.log('Sending message:', message);
    setShowMessageModal(false);
    setMessage('');
  };

  const handleScheduleTour = () => {
    // Mock tour scheduling
    console.log('Scheduling tour:', { selectedTourType, selectedDate, selectedTime });
    setShowTourModal(false);
  };

  return (
    <>
      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-sm border-t border-border p-4 lg:hidden">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="lg"
            iconName="MessageCircle"
            iconPosition="left"
            className="flex-1"
            onClick={() => setShowMessageModal(true)}
          >
            Message
          </Button>
          <Button
            variant="default"
            size="lg"
            iconName="Calendar"
            iconPosition="left"
            className="flex-1 brand-gradient text-white"
            onClick={() => setShowTourModal(true)}
          >
            Tour
          </Button>
          <Button
            variant="outline"
            size="lg"
            iconName="Phone"
            className="w-14"
          >
          </Button>
        </div>
      </div>
      {/* Desktop Action Buttons */}
      <div className="hidden lg:block bg-surface rounded-lg p-6 sticky top-24">
        <div className="space-y-4">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-primary mb-1">
              ${property?.rent?.toLocaleString()}<span className="text-lg text-text-secondary">/month</span>
            </div>
            <p className="text-sm text-text-secondary">Available {property?.availability}</p>
          </div>

          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
            className="brand-gradient text-white"
            onClick={() => setShowTourModal(true)}
          >
            Schedule Tour
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => setShowMessageModal(true)}
          >
            Send Message
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" iconName="Phone" iconPosition="left">
              Call
            </Button>
            <Button variant="outline" iconName="Heart" iconPosition="left">
              Save
            </Button>
          </div>

          <div className="pt-4 border-t border-border text-center">
            <p className="text-sm text-text-secondary mb-2">Response time</p>
            <p className="font-medium text-text-primary">{owner?.responseTime}</p>
          </div>
        </div>
      </div>
      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Send Message</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMessageModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg">
                <img
                  src={owner?.avatar}
                  alt={owner?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-text-primary">{owner?.name}</p>
                  <p className="text-sm text-text-secondary">Property Owner</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Your Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e?.target?.value)}
                  placeholder={`Hi ${owner?.name}, I'm interested in your property at ${property?.address}. Could you please provide more information?`}
                  className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSendMessage}
                  disabled={!message?.trim()}
                  className="flex-1"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Tour Scheduling Modal */}
      {showTourModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Schedule Tour</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTourModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Tour Type Selection */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Tour Type
                </label>
                <div className="space-y-2">
                  {tourTypes?.map((type) => (
                    <button
                      key={type?.id}
                      onClick={() => setSelectedTourType(type?.id)}
                      className={`w-full p-3 rounded-lg border-2 text-left smooth-transition ${
                        selectedTourType === type?.id
                          ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={type?.icon} size={20} className="text-primary" />
                        <div>
                          <div className="font-medium text-text-primary">{type?.label}</div>
                          <div className="text-sm text-text-secondary">{type?.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <Input
                  label="Preferred Date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e?.target?.value)}
                  min={new Date()?.toISOString()?.split('T')?.[0]}
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Preferred Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes?.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded-lg border text-sm smooth-transition ${
                        selectedTime === time
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowTourModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleScheduleTour}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1"
                >
                  Schedule Tour
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactActions;