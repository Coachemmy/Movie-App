import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai'; 

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY }); 

const ChatbotModal = ({ onHide }) => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([
    { sender: 'ai', text: "Hi! I'm here to help. Ask me anything about movies or AI!" }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const speakTitle = () => {
      if (window.speechSynthesis.speaking) return;
      const utterance = new SpeechSynthesisUtterance("Welcome to Movieers, home of best movie recommendations");
      window.speechSynthesis.speak(utterance);
    };
    speakTitle();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    setConversation(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');

    try {

      const formattedQuery = `${input}. Provide 2 movie recommendations with titles and 10-word descriptions.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: formattedQuery
      });

      const parsedResponse = parseAIResponse(response.text);

      setConversation(prev => [
        ...prev,
        { sender: 'ai', movies: parsedResponse.length > 0 ? parsedResponse : null, text: parsedResponse.length === 0 ? response.text : null }
      ]);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      setConversation(prev => [
        ...prev,
        { sender: 'ai', text: "Sorry, we're having trouble connecting. Please try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  };


  const parseAIResponse = (text) => {
    const regex = /(\*\*(.+?)\*\*\s*-\s*)(.{1,50})/gs; 
    const matches = [...text.matchAll(regex)];
    return matches.map(match => ({
      title: match[2].trim(),
      description: match[3].trim()
    }));
  };


  return (
    <div className="h-full flex flex-col text-white border border-gray-800 bg-gray-900 rounded-lg shadow-lg">
    
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-xl font-bold">Movieers AI Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-xl p-3 ${msg.sender === 'user' ? 'bg-black-800' : 'bg-black'}`}>
              {msg.movies ? (
                <div className="grid grid-cols-1 gap-3">
                  {msg.movies.map((movie, index) => (
                    <div key={index} className="rounded-lg overflow-hidden bg-gray-800 p-3">
                      <h4 className="font-bold text-lg">{movie.title}</h4>
                      <p className="text-sm mt-2">{movie.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>{msg.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-xl p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

   
      <div className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? '...' : '→'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;




//THIS IS FOR MAKING THE MOVIEERS AI CHATBOT WORK WITH THE MOVIE API
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { API_SEARCH, API_DISCOVER, API_URL, API_IMG } from '../services/api.js'; 
// import { useNavigate } from 'react-router-dom';

// const ChatbotModal = ({ onHide }) => {
//   const navigate = useNavigate();
//   const [input, setInput] = useState('');
//   const [conversation, setConversation] = useState([
//     { sender: 'ai', text: "Hi! I'll help you find great movies. Try: 'Action'" }
//   ]);
//   const [loading, setLoading] = useState(false);

//     useEffect(() => {
//     const speakTitle = () => {
//         if (window.speechSynthesis.speaking) {
//         return; 
//       }
//       const utterance = new SpeechSynthesisUtterance("Welcome to Movieers, home of best movie recommedations");
//       window.speechSynthesis.speak(utterance);
//     };
//     speakTitle();
//   }, []);

//   const handleGoToHome = () => {
//     onHide(); 
//     navigate('/home'); 
//   };


//   // Enhanced genre mapping
//   const getGenreFromQuery = (query) => {
//     const genreMap = {
//       action: ['action', 'fight', 'battle', 'war', 'adventure', 'explosion', 'hero'],
//       comedy: ['comedy', 'funny', 'humor', 'laugh', 'joke', 'satire'],
//       horror: ['horror', 'scary', 'terror', 'fright', 'ghost', 'haunt', 'zombie'],
//       romance: ['romance', 'love', 'relationship', 'couple', 'dating', 'valentine'],
//       scifi: ['sci-fi', 'scifi', 'space', 'alien', 'future', 'robot', 'ai', 'cyber'],
//       thriller: ['thriller', 'suspense', 'mystery', 'crime', 'murder', 'detective'],
//       drama: ['drama', 'emotional', 'serious', 'life story'],
//       fantasy: ['fantasy', 'magic', 'kingdom', 'dragon'],
//       animation: ['animation', 'animated', 'cartoon']
//     };

//     const queryLower = query.toLowerCase();
//     for (const [genre, keywords] of Object.entries(genreMap)) {
//       if (keywords.some(kw => queryLower.includes(kw))) {
//         return genre;
//       }
//     }
//     return null;
//   };

//   const getGenreId = (genre) => {
//     const genres = {
//       action: 28, comedy: 35, horror: 27, romance: 10749, scifi: 878, thriller: 53, drama: 18, fantasy: 14, animation: 16
//     };
//     return genres[genre] || null;
//   };

//   const searchMovies = async (query) => {
//     const API_KEY = 'APIKEY';
//     const API_DISCOVER = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
//     const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
  
//     try {
//       const yearMatch = query.match(/(19|20)\d{2}/);
//       const year = yearMatch ? yearMatch[0] : null;
//       const genre = getGenreFromQuery(query);
  
//       if (genre) {
//         const genreId = getGenreId(genre);
//         const params = new URLSearchParams({
//           with_genres: genreId,
//           sort_by: 'popularity.desc',
//           page: 1,
//         });
//         if (year) params.append('primary_release_year', year);
  
//         // console.log(`Searching by genre: ${genre} (ID: ${genreId}) with params:`, params.toString());
//         const { data } = await axios.get(`${API_DISCOVER}&${params}`);
//         return data.results || []; 
//       } else {
//         const params = new URLSearchParams({
//           query: query,
//           sort_by: 'popularity.desc',
//         });
//         if (year) params.append('year', year);
  
//         // console.log(`Fallback search for query: ${query} with params:`, params.toString());
//         const { data } = await axios.get(`${API_SEARCH}${params}`);
//         return data.results || []; 
//       }
//     } catch (error) {
//       console.error("Search error:", error);
//       throw error;
//     }
//   };

//   const handleSend = async () => {
//     if (!input.trim() || loading) return;

//     setLoading(true);
//     setConversation(prev => [...prev, { sender: 'user', text: input }]);
//     setInput('');

//     try {
//       setConversation(prev => [...prev, { sender: 'ai', text: "Movieers AI response" }]);
      
//       const movies = await searchMovies(input);
      
//       if (movies.length > 0) {
//         setConversation(prev => [
//           ...prev,
//           { 
//             sender: 'movies', 
//             data: movies.slice(0, 4).map(m => ({
//               ...m,
//               poster: m.poster_path ? `${API_IMG}${m.poster_path}` : null
//             }))
//           }
//         ]);
//       } else {
//         setConversation(prev => [
//           ...prev,
//           { sender: 'ai', 
//             text: "Sure! To give you the best recommendations, could you tell me a bit about your preferences? For example: Favorite genres (e.g., action, sci-fi, comedy, horror, animation, fantasy, drama, thriller)?" }
//         ]);
//       }
//     } catch (error) {
//       setConversation(prev => [
//         ...prev,
//         { sender: 'ai', text: "Sorry, we're having trouble connecting. Please try again later." }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//      <div className="h-full flex flex-col text-white border border-gray-800 bg-gray-900 rounded-lg shadow-lg">
        
//         {/* Header */}
//         <div className="p-4 border-b border-gray-800 flex justify-between items-center">
//           <h2 className="text-xl font-bold">Movieers AI Assistant</h2>         
//         </div>

//         {/* Conversation */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {conversation.map((msg, i) => (
//             <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//               <div className={`max-w-[80%] rounded-xl p-3 ${
//                 msg.sender === 'user' ? 'bg-black-800' : 'bg-black'
//               }`}>
//                 {msg.sender === 'movies' ? (
//                   <div className="grid grid-cols-2 gap-3">
//                     {msg.data.map(movie => (
//                       <div key={movie.id} className="rounded-lg overflow-hidden">
                       
//                         <div className="p-2">
//                           <h4 className="font-bold text-sm">{movie.title}</h4>
//                           <p className="text-xs">
//                             {movie.overview}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>{msg.text}</p>
//                 )}
//               </div>
//             </div>
//           ))}
//           {loading && (
//             <div className="flex justify-start">
//               <div className="bg-gray-800 rounded-xl p-3">
//                 <div className="flex space-x-2">
//                   <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
//                   <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-100"></div>
//                   <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-200"></div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t border-gray-800">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//               placeholder="Search for movies..."
//               className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={loading}
//             />
//             <button
//               onClick={handleSend}
//               disabled={loading}
//               className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg disabled:opacity-50"
//             >
//               {loading ? '...' : '→'}
//             </button>
//           </div>
//         </div>
        
//       </div>
    
//   );
// };

// export default ChatbotModal;