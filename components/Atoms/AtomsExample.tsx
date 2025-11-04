/**
 * Atom Components Usage Examples
 * 
 * This file demonstrates how to use the custom atom components
 * in your Doone application.
 */

import React from 'react';
import { ScrollView } from 'react-native';
import {
  CustomText,
  CustomView,
  CustomButton,
  CustomInput,
} from '~/components/Atoms';

export default function AtomsExample() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ScrollView>
      <CustomView padding="6" bg="primary">
        
        {/* Text Examples */}
        <CustomView marginY="4">
          <CustomText variant="h1" weight="bold" color="brand-primary">
            Doone: Simply Done.
          </CustomText>
          
          <CustomText variant="h2" weight="semibold" color="secondary">
            Welcome Back
          </CustomText>
          
          <CustomText variant="body-md" color="tertiary">
            Sign in to continue managing your tasks
          </CustomText>
          
          <CustomText variant="caption" color="tertiary" uppercase>
            Premium Member
          </CustomText>
        </CustomView>

        {/* View Examples */}
        <CustomView
          bg="elevated"
          padding="4"
          rounded="lg"
          border
          borderColor="primary"
          marginY="4"
        >
          <CustomText variant="body-lg" weight="medium">
            This is an elevated card with border
          </CustomText>
        </CustomView>

        <CustomView
          bg="brand-primary"
          padding="4"
          rounded="xl"
          center
          marginY="4"
        >
          <CustomText variant="h3" color="inverse" center>
            Centered Content
          </CustomText>
        </CustomView>

        {/* Input Examples */}
        <CustomView marginY="4">
          <CustomInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            helperText="We'll never share your email"
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={password && password.length < 8 ? 'Password must be at least 8 characters' : undefined}
          />

          <CustomInput
            label="Task Name"
            placeholder="What needs to be done?"
            variant="filled"
            size="lg"
          />

          <CustomInput
            label="Search"
            placeholder="Search tasks..."
            variant="outline"
            size="sm"
          />
        </CustomView>

        {/* Button Examples */}
        <CustomView marginY="4">
          <CustomButton
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => console.log('Primary button pressed')}
          >
            Sign In
          </CustomButton>

          <CustomView marginY="2" />

          <CustomButton
            variant="secondary"
            size="md"
            fullWidth
            onPress={() => console.log('Secondary button pressed')}
          >
            Create Account
          </CustomButton>

          <CustomView marginY="2" />

          <CustomButton
            variant="outline"
            size="md"
            onPress={() => console.log('Outline button pressed')}
          >
            Cancel
          </CustomButton>

          <CustomView marginY="2" />

          <CustomButton
            variant="text"
            size="sm"
            onPress={() => console.log('Text button pressed')}
          >
            Forgot Password?
          </CustomButton>

          <CustomView marginY="2" />

          <CustomButton
            variant="danger"
            size="md"
            onPress={() => console.log('Danger button pressed')}
          >
            Delete Task
          </CustomButton>

          <CustomView marginY="2" />

          <CustomButton
            variant="primary"
            size="md"
            loading
            disabled
          >
            Loading...
          </CustomButton>
        </CustomView>

        {/* Layout Examples */}
        <CustomView row paddingY="4">
          <CustomView
            bg="brand-primary"
            padding="4"
            rounded="md"
            style={{ flex: 1, marginRight: 8 }}
          >
            <CustomText color="inverse" center>Left</CustomText>
          </CustomView>
          
          <CustomView
            bg="brand-secondary"
            padding="4"
            rounded="md"
            style={{ flex: 1, marginLeft: 8 }}
          >
            <CustomText color="inverse" center>Right</CustomText>
          </CustomView>
        </CustomView>

        {/* Status Examples */}
        <CustomView marginY="4">
          <CustomView bg="success" padding="2" rounded="md" marginY="1">
            <CustomText variant="body-sm" color="success">
              ✓ Task completed successfully!
            </CustomText>
          </CustomView>

          <CustomView bg="error" padding="2" rounded="md" marginY="1">
            <CustomText variant="body-sm" color="error">
              ✗ Error: Unable to save task
            </CustomText>
          </CustomView>

          <CustomView bg="warning" padding="2" rounded="md" marginY="1">
            <CustomText variant="body-sm" color="warning">
              ⚠ Warning: Task is overdue
            </CustomText>
          </CustomView>

          <CustomView bg="info" padding="2" rounded="md" marginY="1">
            <CustomText variant="body-sm" color="info">
              ℹ Tip: You can swipe to delete tasks
            </CustomText>
          </CustomView>
        </CustomView>

      </CustomView>
    </ScrollView>
  );
}
