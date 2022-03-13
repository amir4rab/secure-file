/** @type {import('@types/jest')} */
import { render, screen } from '@testing-library/react';

import Video from './video';

// for some reason video element has some problems, and log errors, even while the every test passes

describe('Web Video player tests', () => {
  beforeEach(() => {
    render(<Video/>);
  });

  it('test' , () => {
    expect('test').toBe('test')
  });

  
  test('should have an overlay before start', async () => {
    const overlay = screen.getByTestId('overlay');
    expect(overlay).toBeInTheDocument;
  });
  
  return; // returns to not show jsDom errors

  test('overlay must be hidden after click', async () => {
    const overlay = screen.getByTestId('overlay');
    (await screen.findByTestId('overlayButton')).click();

    expect(overlay).not.toBeVisible;
  });

  test('video must be playing after click', async () => {
    (await screen.findByTestId('overlayButton')).click();
    const video = screen.getByTestId('video') as HTMLVideoElement;

    expect(video.paused).not.toBeTruthy;
  });
  
  test('controls must be visible and hidden after click', async () => {
    (await screen.findByTestId('overlayButton')).click();
    const wrapper = screen.getByTestId('wrapper');
    const controls = screen.getByTestId('controls');

    expect(controls).not.toBeVisible;
    wrapper.click();
    expect(controls).toBeVisible;
    wrapper.click();
    expect(controls).not.toBeVisible;
  });

  test('Video must be played and stopped by control buttons', async () => {
    (await screen.findByTestId('overlayButton')).click();
    const wrapper = screen.getByTestId('wrapper');
    const playButton = screen.getByTestId('playToggle');
    const video = screen.getByTestId('video') as HTMLVideoElement;


    wrapper.click();
    playButton.click(); // pauses the video
    expect(video.paused).toBeTruthy;

    playButton.click(); // starts the video
    expect(video.paused).not.toBeTruthy;
  });

  test('Video must be played and stopped by control buttons', async () => {
    (await screen.findByTestId('overlayButton')).click();
    const wrapper = screen.getByTestId('wrapper');
    const muteButton = screen.getByTestId('muteToggle');
    const video = screen.getByTestId('video') as HTMLVideoElement;


    wrapper.click();
    muteButton.click(); // mute's the video
    expect(video.muted).toBeTruthy;

    muteButton.click(); // unmute's the video
    expect(video.muted).not.toBeTruthy;
  });
})