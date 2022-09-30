import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;
  color: ${({ theme }) => theme['gray-100']};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme['green-500']};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme['green-700']};
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme['red-500']};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme['red-700']};
  }
`
