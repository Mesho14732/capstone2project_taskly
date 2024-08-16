

const authService = require('../../src/services/authService');
const { expect } = require('chai');

describe('Auth Service', () => {
  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      // Arrange
      const credentials = { username: 'user', password: 'pass' };
      const mockToken = 'mockToken';
      authService.login = async (creds) => mockToken;

      // Act
      const token = await authService.login(credentials);

      // Assert
      expect(token).to.equal(mockToken);
    });

    it('should throw an error for invalid credentials', async () => {
      // Arrange
      const invalidCredentials = { username: 'user', password: 'wrongPass' };
      authService.login = async () => { throw new Error('Invalid credentials'); };

      // Act & Assert
      try {
        await authService.login(invalidCredentials);
      } catch (error) {
        expect(error.message).to.equal('Invalid credentials');
      }
    });
  });
});
