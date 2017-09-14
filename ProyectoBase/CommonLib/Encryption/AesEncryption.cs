using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

/// <summary> 
/// Contiene Tipos para  realizar la protección de datos
/// </summary>
namespace CommonLib
{
    /// <summary>
    /// Provee de métodos para la encriptación y des encriptación de datos en modo AES.
    /// </summary>
    public class AesEncryption
    {
        private static byte[] key = { 35, 217, 213, 212, 213, 47, 153, 58, 220, 15, 0, 188, 43, 159, 212, 78, 46, 234, 152, 100, 232, 194, 135, 86, 18, 200, 235, 148, 8, 129, 117, 136 };
        private static byte[] vector = { 25, 183, 134, 105, 14, 181, 225, 226, 64, 171, 235, 207, 64, 173, 219, 128 };

        private static AesEncryption instance;
        private UTF8Encoding encoder;
        private ICryptoTransform encryptor, decryptor;

        /// <summary>
        /// Inicializa la clase.
        /// </summary>
        public AesEncryption()
        {
            RijndaelManaged rm = new RijndaelManaged();
            encryptor = rm.CreateEncryptor(key, vector);
            decryptor = rm.CreateDecryptor(key, vector);
            encoder = new UTF8Encoding();
        }

        /// <summary>
        /// Obtiene una instancia de AesEncryption.
        /// </summary>
        /// <returns>Instancia estática del encriptador</returns>
        public static AesEncryption GetInstance()
        {
            if (instance == null)
            {
                instance = new AesEncryption();
            }
            return instance;
        }

        /// <summary>
        /// Desencripta el parámetro especificado
        /// </summary>
        /// <param name="unencrypted">Texto encriptado</param>
        /// <returns>Texto sin encriptar</returns>
        public string Decrypt(string encrypted)
        {
            return encoder.GetString(Decrypt(Convert.FromBase64String(encrypted)));
        }

        /// <summary>
        /// Desencripta el parámetro especificado
        /// </summary>
        /// <param name="buffer">Colección de bytes encriptado</param>
        /// <returns>Colección de bytes sin encriptar</returns>
        public byte[] Decrypt(byte[] buffer)
        {
            return Transform(buffer, decryptor);
        }

        /// <summary>
        /// Encripta el parámetro especificado
        /// </summary>
        /// <param name="unencrypted">Texto sin encriptar</param>
        /// <returns>Texto encriptado</returns>
        public string Encrypt(string unencrypted)
        {
            return Convert.ToBase64String(Encrypt(encoder.GetBytes(unencrypted)));
        }

        /// <summary>
        /// Encripta el parámetro especificado
        /// </summary>
        /// <param name="buffer">Colección de bytes sin encriptar</param>
        /// <returns>Colección de bytes encriptado</returns>
        public byte[] Encrypt(byte[] buffer)
        {
            return Transform(buffer, encryptor);
        }

        /// <summary>
        /// Transforma una colección de bytes a otra usando la operación de transformación especificada
        /// </summary>
        /// <param name="buffer">Colección de bytes a transformar</param>
        /// <param name="transform">Operador de transformación</param>
        /// <returns>Colección de bytes transformado</returns>
        protected byte[] Transform(byte[] buffer, ICryptoTransform transform)
        {
            MemoryStream stream = new MemoryStream();
            using (CryptoStream cs = new CryptoStream(stream, transform, CryptoStreamMode.Write))
            {
                cs.Write(buffer, 0, buffer.Length);
            }

            return stream.ToArray();
        }
    }
}