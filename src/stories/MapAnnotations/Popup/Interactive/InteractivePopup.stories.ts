import type { Meta, StoryObj } from '@storybook/react';
import InteractivePopup from './InteractivePopupExample';

const meta: Meta<typeof InteractivePopup> = {
  title: 'Map Annotations/Popup/Interactive Popup',
  component: InteractivePopup,
  args: {
    isVisible: true,
    options: {
      position: [0, 0],
    },
  },
  parameters: {
    storySource: {
      source: `
import { useContext, useEffect, useState, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import atlas from 'azure-maps-control';
import { IAzureMapsContextProps, AzureMapsContext, IAzureMapPopupEvent } from 'react-azure-maps';

interface InteractivePopupProps {
  children: ReactNode;
  isVisible?: boolean;
  options?: atlas.PopupOptions;
  events?: IAzureMapPopupEvent[];
};

const InteractivePopup = ({ children, isVisible = true, options, events }: InteractivePopupProps) => {
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext);
  const containerRef = document.createElement('div');
  const root = createRoot(containerRef);
  const [popupRef] = useState<atlas.Popup>(new atlas.Popup({ ...options, content: containerRef }));

  // Add events to the popup when it is mounted
  useEffect(() => {
    if (mapRef) {
      events &&
        events.forEach(({ eventName, callback }) => {
          mapRef.events.add(eventName, popupRef, callback);
        });
      return () => {
        mapRef.popups.remove(popupRef);
      };
    }
  }, []);

  // Render the popup content and set the options
  useEffect(() => {
    root.render(children);
    popupRef.setOptions({
      ...options,
      content: containerRef,
    });
    if (mapRef && isVisible && !popupRef.isOpen()) {
      popupRef.open(mapRef);
    }
  }, [options, children]);

  // Toggle the popup visibility
  useEffect(() => {
    if (mapRef) {
      if (isVisible && !popupRef.isOpen()) {
        popupRef.open(mapRef);
      } else if (mapRef.popups.getPopups().length && !isVisible && popupRef.isOpen()) {
        popupRef.close();
      }
    }
  }, [isVisible]);

  return null;
};
`,
    },
  },
};

export default meta;

type Story = StoryObj<typeof InteractivePopup>;

export const Example: Story = {};
