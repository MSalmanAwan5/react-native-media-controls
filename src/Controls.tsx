import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  StyleProp,
  ViewStyle,
} from "react-native";
import styles from "./MediaControls.style";
import { getPlayerStateIcon } from "./utils";
import { Props } from "./MediaControls";
import { PLAYER_STATES } from "./constants/playerStates";

type ControlsProps = Pick<
  Props,
  "isLoading" | "mainColor" | "playerState" | "onReplay"
> & {
  onPause: () => void;
  renderPlayIcon?: () => ReactNode;
  playIconContainerStyle?: StyleProp<ViewStyle>;
};

const Controls = (props: ControlsProps) => {
  const {
    isLoading,
    mainColor,
    playerState,
    onReplay,
    onPause,
    renderPlayIcon,
    playIconContainerStyle,
  } = props;
  const icon = getPlayerStateIcon(playerState);
  const pressAction = playerState === PLAYER_STATES.ENDED ? onReplay : onPause;

  const content = isLoading ? (
    <ActivityIndicator size="large" color="#FFF" />
  ) : (
    <TouchableOpacity
      style={[
        styles.playButton,
        { backgroundColor: mainColor },
        playIconContainerStyle,
      ]}
      onPress={pressAction}
      accessibilityLabel={PLAYER_STATES.PAUSED ? "Tap to Play" : "Tap to Pause"}
      accessibilityHint={"Plays and Pauses the Video"}
    >
      {renderPlayIcon ? (
        renderPlayIcon()
      ) : (
        <Image source={icon} style={styles.playIcon} />
      )}
    </TouchableOpacity>
  );

  return <View style={[styles.controlsRow]}>{content}</View>;
};

export { Controls };
