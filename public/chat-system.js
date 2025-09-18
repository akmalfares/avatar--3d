// Advanced Chat System for Coptic Orthodox Website
class CopticChatSystem {
    constructor() {
        this.currentUser = null;
        this.currentRoom = 'general';
        this.messages = new Map();
        this.users = new Map();
        this.rooms = new Map();
        this.isConnected = false;
        this.messageHistory = [];
        this.typingUsers = new Set();
        this.initializeRooms();
        this.initializeUsers();
        this.loadSampleMessages();
    }

    initializeRooms() {
        this.rooms.set('general', {
            id: 'general',
            name: 'المحادثة العامة',
            description: 'نقاشات عامة حول الإيمان والحياة المسيحية',
            icon: 'fas fa-comments',
            color: '#4299e1',
            moderators: ['أبونا يوحنا', 'الشماس مرقس'],
            members: 0,
            isActive: true
        });

        this.rooms.set('questions', {
            id: 'questions',
            name: 'الأسئلة والاستفسارات',
            description: 'طرح الأسئلة الروحية والحصول على إجابات',
            icon: 'fas fa-question-circle',
            color: '#48bb78',
            moderators: ['أبونا بولس', 'الأنبا مكاريوس'],
            members: 0,
            isActive: true
        });

        this.rooms.set('prayers', {
            id: 'prayers',
            name: 'طلبات الصلاة',
            description: 'مشاركة طلبات الصلاة والدعم الروحي',
            icon: 'fas fa-praying-hands',
            color: '#ed8936',
            moderators: ['أم مريم', 'الشماس يوسف'],
            members: 0,
            isActive: true
        });

        this.rooms.set('youth', {
            id: 'youth',
            name: 'الشباب المسيحي',
            description: 'مواضيع خاصة بالشباب والخدمة',
            icon: 'fas fa-users',
            color: '#9f7aea',
            moderators: ['أبونا أنطونيوس', 'الشماس جرجس'],
            members: 0,
            isActive: true
        });

        this.rooms.set('family', {
            id: 'family',
            name: 'الأسرة المسيحية',
            description: 'نصائح للحياة الأسرية والتربية المسيحية',
            icon: 'fas fa-home',
            color: '#f56565',
            moderators: ['أم مارثا', 'أبونا متى'],
            members: 0,
            isActive: true
        });

        this.rooms.set('bible_study', {
            id: 'bible_study',
            name: 'دراسة الكتاب المقدس',
            description: 'دراسة وتفسير نصوص الكتاب المقدس',
            icon: 'fas fa-book-open',
            color: '#d4af37',
            moderators: ['أبونا داود', 'الشماس لوقا'],
            members: 0,
            isActive: true
        });
    }

    initializeUsers() {
        const sampleUsers = [
            { id: 'priest1', name: 'أبونا يوحنا', role: 'priest', avatar: '👨‍💼', status: 'online' },
            { id: 'priest2', name: 'أبونا بولس', role: 'priest', avatar: '👨‍💼', status: 'online' },
            { id: 'deacon1', name: 'الشماس مرقس', role: 'deacon', avatar: '👨‍🎓', status: 'online' },
            { id: 'user1', name: 'مريم', role: 'member', avatar: '👩', status: 'online' },
            { id: 'user2', name: 'يوسف', role: 'member', avatar: '👨', status: 'online' },
            { id: 'user3', name: 'مارثا', role: 'member', avatar: '👩', status: 'away' },
            { id: 'user4', name: 'جرجس', role: 'member', avatar: '👨', status: 'online' }
        ];

        sampleUsers.forEach(user => {
            this.users.set(user.id, user);
        });
    }

    loadSampleMessages() {
        const sampleMessages = {
            general: [
                {
                    id: 'msg1',
                    userId: 'priest1',
                    userName: 'أبونا يوحنا',
                    userRole: 'priest',
                    message: 'مرحباً بكم جميعاً في المحادثة العامة. نسأل الله أن يبارك هذا اللقاء الروحي.',
                    timestamp: new Date(Date.now() - 3600000),
                    reactions: { '🙏': 5, '❤️': 3 },
                    isAnnouncement: true
                },
                {
                    id: 'msg2',
                    userId: 'user1',
                    userName: 'مريم',
                    userRole: 'member',
                    message: 'شكراً أبونا على هذا الموقع الرائع. ربنا يبارك تعب محبتكم.',
                    timestamp: new Date(Date.now() - 3000000),
                    reactions: { '🙏': 2, '❤️': 4 }
                },
                {
                    id: 'msg3',
                    userId: 'user2',
                    userName: 'يوسف',
                    userRole: 'member',
                    message: 'هل يمكن إضافة المزيد من الكتب الروحية؟',
                    timestamp: new Date(Date.now() - 1800000),
                    reactions: { '👍': 3 }
                }
            ],
            questions: [
                {
                    id: 'q1',
                    userId: 'user3',
                    userName: 'مارثا',
                    userRole: 'member',
                    message: 'ما هو الفرق بين الصوم الكبير وصوم الميلاد؟',
                    timestamp: new Date(Date.now() - 7200000),
                    reactions: { '🤔': 2 }
                },
                {
                    id: 'q2',
                    userId: 'priest2',
                    userName: 'أبونا بولس',
                    userRole: 'priest',
                    message: 'الصوم الكبير يستمر 55 يوماً ويركز على التوبة والاستعداد للقيامة، بينما صوم الميلاد 43 يوماً للاستعداد لميلاد المسيح.',
                    timestamp: new Date(Date.now() - 7000000),
                    reactions: { '🙏': 6, '📚': 3 },
                    isAnswer: true
                }
            ],
            prayers: [
                {
                    id: 'p1',
                    userId: 'user4',
                    userName: 'جرجس',
                    userRole: 'member',
                    message: 'أطلب صلواتكم من أجل شفاء والدي من المرض.',
                    timestamp: new Date(Date.now() - 5400000),
                    reactions: { '🙏': 8, '❤️': 5 },
                    isPrayerRequest: true
                }
            ]
        };

        Object.keys(sampleMessages).forEach(roomId => {
            this.messages.set(roomId, sampleMessages[roomId]);
        });
    }

    // Chat UI Management
    renderChatInterface() {
        const chatContainer = document.getElementById('chatContainer');
        if (!chatContainer) return;

        chatContainer.innerHTML = `
            <div class="chat-system" style="display: flex; height: 600px; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <!-- Sidebar -->
                <div class="chat-sidebar" style="width: 300px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; flex-direction: column;">
                    <!-- User Profile -->
                    <div class="user-profile" style="padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                                👤
                            </div>
                            <div>
                                <h4 style="margin: 0; font-size: 1.1rem;">مرحباً بك</h4>
                                <p style="margin: 0; opacity: 0.8; font-size: 0.9rem;">عضو في الكنيسة</p>
                            </div>
                        </div>
                    </div>

                    <!-- Rooms List -->
                    <div class="rooms-list" style="flex: 1; overflow-y: auto; padding: 1rem 0;">
                        <h5 style="padding: 0 1.5rem; margin: 0 0 1rem 0; opacity: 0.8; font-size: 0.9rem;">غرف المحادثة</h5>
                        ${this.renderRoomsList()}
                    </div>

                    <!-- Online Users -->
                    <div class="online-users" style="border-top: 1px solid rgba(255,255,255,0.1); padding: 1rem 1.5rem;">
                        <h6 style="margin: 0 0 0.5rem 0; opacity: 0.8; font-size: 0.8rem;">متصل الآن (${this.getOnlineUsersCount()})</h6>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            ${this.renderOnlineUsers()}
                        </div>
                    </div>
                </div>

                <!-- Main Chat Area -->
                <div class="chat-main" style="flex: 1; display: flex; flex-direction: column;">
                    <!-- Chat Header -->
                    <div class="chat-header" style="padding: 1.5rem; border-bottom: 1px solid #e2e8f0; background: #f7fafc;">
                        ${this.renderChatHeader()}
                    </div>

                    <!-- Messages Area -->
                    <div class="messages-container" style="flex: 1; overflow-y: auto; padding: 1rem;" id="messagesContainer">
                        ${this.renderMessages()}
                    </div>

                    <!-- Typing Indicator -->
                    <div class="typing-indicator" style="padding: 0 1rem; min-height: 30px; display: flex; align-items: center;" id="typingIndicator">
                        ${this.renderTypingIndicator()}
                    </div>

                    <!-- Message Input -->
                    <div class="message-input-area" style="padding: 1rem; border-top: 1px solid #e2e8f0; background: #f7fafc;">
                        ${this.renderMessageInput()}
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    renderRoomsList() {
        let roomsHtml = '';
        this.rooms.forEach(room => {
            const isActive = room.id === this.currentRoom;
            roomsHtml += `
                <div class="room-item ${isActive ? 'active' : ''}" 
                     data-room="${room.id}" 
                     style="padding: 0.8rem 1.5rem; cursor: pointer; display: flex; align-items: center; gap: 1rem; transition: all 0.3s ease; ${isActive ? 'background: rgba(255,255,255,0.2);' : ''}"
                     onmouseover="this.style.background='rgba(255,255,255,0.1)'" 
                     onmouseout="this.style.background='${isActive ? 'rgba(255,255,255,0.2)' : 'transparent'}'">
                    <i class="${room.icon}" style="color: ${isActive ? 'white' : 'rgba(255,255,255,0.8)'}; font-size: 1.2rem;"></i>
                    <div style="flex: 1;">
                        <h6 style="margin: 0; font-size: 0.95rem; color: ${isActive ? 'white' : 'rgba(255,255,255,0.9)'};">${room.name}</h6>
                        <p style="margin: 0; font-size: 0.8rem; opacity: 0.7; color: rgba(255,255,255,0.7);">${room.members} عضو</p>
                    </div>
                    ${this.getUnreadCount(room.id) > 0 ? `<span style="background: #f56565; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">${this.getUnreadCount(room.id)}</span>` : ''}
                </div>
            `;
        });
        return roomsHtml;
    }

    renderOnlineUsers() {
        let usersHtml = '';
        this.users.forEach(user => {
            if (user.status === 'online') {
                usersHtml += `
                    <div style="width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;" title="${user.name}">
                        <span style="font-size: 0.9rem;">${user.avatar}</span>
                        <div style="position: absolute; bottom: -2px; right: -2px; width: 10px; height: 10px; background: #48bb78; border: 2px solid white; border-radius: 50%;"></div>
                    </div>
                `;
            }
        });
        return usersHtml;
    }

    renderChatHeader() {
        const room = this.rooms.get(this.currentRoom);
        return `
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <i class="${room.icon}" style="color: ${room.color}; font-size: 1.5rem;"></i>
                    <div>
                        <h4 style="margin: 0; color: #2d3748;">${room.name}</h4>
                        <p style="margin: 0; color: #718096; font-size: 0.9rem;">${room.description}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="copticChat.toggleRoomInfo()" style="background: none; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem; cursor: pointer; color: #4a5568;" title="معلومات الغرفة">
                        <i class="fas fa-info-circle"></i>
                    </button>
                    <button onclick="copticChat.toggleNotifications()" style="background: none; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem; cursor: pointer; color: #4a5568;" title="الإشعارات">
                        <i class="fas fa-bell"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderMessages() {
        const roomMessages = this.messages.get(this.currentRoom) || [];
        let messagesHtml = '';

        roomMessages.forEach(message => {
            const user = this.users.get(message.userId);
            const isOwnMessage = message.userId === 'current_user';
            const timeString = this.formatTime(message.timestamp);

            messagesHtml += `
                <div class="message ${isOwnMessage ? 'own-message' : ''}" style="margin-bottom: 1.5rem; display: flex; align-items: flex-start; gap: 1rem; ${isOwnMessage ? 'flex-direction: row-reverse;' : ''}">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: ${this.getUserColor(message.userRole)}; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; flex-shrink: 0;">
                        ${message.userName.charAt(0)}
                    </div>
                    <div style="flex: 1; max-width: 70%;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem; ${isOwnMessage ? 'justify-content: flex-end;' : ''}">
                            <span style="font-weight: 600; color: #2d3748; font-size: 0.9rem;">${message.userName}</span>
                            ${this.getRoleBadge(message.userRole)}
                            <span style="font-size: 0.8rem; color: #718096;">${timeString}</span>
                        </div>
                        <div style="background: ${isOwnMessage ? '#4299e1' : message.isAnnouncement ? '#fef5e7' : '#f7fafc'}; 
                                    color: ${isOwnMessage ? 'white' : '#2d3748'}; 
                                    padding: 1rem; 
                                    border-radius: 15px; 
                                    ${isOwnMessage ? 'border-bottom-right-radius: 5px;' : 'border-bottom-left-radius: 5px;'}
                                    ${message.isAnnouncement ? 'border: 2px solid #d4af37;' : ''}
                                    line-height: 1.5;">
                            ${message.isAnnouncement ? '<i class="fas fa-bullhorn" style="margin-left: 0.5rem; color: #d4af37;"></i>' : ''}
                            ${message.isPrayerRequest ? '<i class="fas fa-praying-hands" style="margin-left: 0.5rem; color: #ed8936;"></i>' : ''}
                            ${message.message}
                        </div>
                        ${this.renderMessageReactions(message)}
                    </div>
                </div>
            `;
        });

        return messagesHtml || '<div style="text-align: center; color: #718096; padding: 2rem;">لا توجد رسائل بعد. كن أول من يبدأ المحادثة!</div>';
    }

    renderMessageReactions(message) {
        if (!message.reactions || Object.keys(message.reactions).length === 0) return '';

        let reactionsHtml = '<div style="display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap;">';
        Object.entries(message.reactions).forEach(([emoji, count]) => {
            reactionsHtml += `
                <button onclick="copticChat.toggleReaction('${message.id}', '${emoji}')" 
                        style="background: rgba(66, 153, 225, 0.1); border: 1px solid rgba(66, 153, 225, 0.3); border-radius: 15px; padding: 0.3rem 0.6rem; cursor: pointer; font-size: 0.8rem; display: flex; align-items: center; gap: 0.3rem;">
                    <span>${emoji}</span>
                    <span style="color: #4299e1; font-weight: 600;">${count}</span>
                </button>
            `;
        });
        reactionsHtml += '</div>';
        return reactionsHtml;
    }

    renderMessageInput() {
        return `
            <div style="display: flex; gap: 1rem; align-items: flex-end;">
                <div style="flex: 1;">
                    <textarea id="messageInput" 
                              placeholder="اكتب رسالتك هنا..." 
                              style="width: 100%; min-height: 50px; max-height: 120px; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 25px; resize: none; font-family: inherit; font-size: 0.9rem; line-height: 1.4;"
                              onkeydown="copticChat.handleKeyDown(event)"
                              oninput="copticChat.handleTyping()"></textarea>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="copticChat.toggleEmojiPicker()" 
                            style="background: #f7fafc; border: 2px solid #e2e8f0; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;"
                            title="إضافة رموز تعبيرية">
                        😊
                    </button>
                    <button onclick="copticChat.sendMessage()" 
                            style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white; border: none; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; transition: transform 0.2s ease;"
                            onmouseover="this.style.transform='scale(1.05)'"
                            onmouseout="this.style.transform='scale(1)'"
                            title="إرسال الرسالة">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderTypingIndicator() {
        if (this.typingUsers.size === 0) return '';

        const typingList = Array.from(this.typingUsers).join('، ');
        return `
            <div style="display: flex; align-items: center; gap: 0.5rem; color: #718096; font-size: 0.9rem;">
                <div style="display: flex; gap: 2px;">
                    <div style="width: 6px; height: 6px; background: #4299e1; border-radius: 50%; animation: typing 1.4s infinite ease-in-out;"></div>
                    <div style="width: 6px; height: 6px; background: #4299e1; border-radius: 50%; animation: typing 1.4s infinite ease-in-out 0.2s;"></div>
                    <div style="width: 6px; height: 6px; background: #4299e1; border-radius: 50%; animation: typing 1.4s infinite ease-in-out 0.4s;"></div>
                </div>
                <span>${typingList} يكتب${this.typingUsers.size > 1 ? 'ون' : ''}...</span>
            </div>
        `;
    }

    // Event Handlers
    attachEventListeners() {
        // Room switching
        document.querySelectorAll('.room-item').forEach(item => {
            item.addEventListener('click', () => {
                const roomId = item.dataset.room;
                this.switchRoom(roomId);
            });
        });

        // Auto-resize textarea
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.addEventListener('input', () => {
                messageInput.style.height = 'auto';
                messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
            });
        }
    }

    // Chat Functions
    switchRoom(roomId) {
        if (this.currentRoom === roomId) return;
        
        this.currentRoom = roomId;
        this.renderChatInterface();
        this.scrollToBottom();
    }

    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message) return;

        const newMessage = {
            id: 'msg_' + Date.now(),
            userId: 'current_user',
            userName: 'أنت',
            userRole: 'member',
            message: message,
            timestamp: new Date(),
            reactions: {}
        };

        // Add message to current room
        if (!this.messages.has(this.currentRoom)) {
            this.messages.set(this.currentRoom, []);
        }
        this.messages.get(this.currentRoom).push(newMessage);

        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';

        // Re-render messages
        this.renderMessages();
        this.scrollToBottom();

        // Simulate response
        this.simulateResponse();
    }

    simulateResponse() {
        setTimeout(() => {
            const responses = [
                'شكراً لك على مشاركتك الرائعة',
                'نقطة ممتازة! الله يبارك حياتك',
                'هذا سؤال مهم جداً، دعنا نناقشه',
                'ربنا يبارك تعب محبتك',
                'موضوع يستحق التأمل والصلاة'
            ];

            const responders = [
                { id: 'priest1', name: 'أبونا يوحنا', role: 'priest' },
                { id: 'deacon1', name: 'الشماس مرقس', role: 'deacon' },
                { id: 'user1', name: 'مريم', role: 'member' }
            ];

            const responder = responders[Math.floor(Math.random() * responders.length)];
            const response = responses[Math.floor(Math.random() * responses.length)];

            const responseMessage = {
                id: 'response_' + Date.now(),
                userId: responder.id,
                userName: responder.name,
                userRole: responder.role,
                message: response,
                timestamp: new Date(),
                reactions: {}
            };

            this.messages.get(this.currentRoom).push(responseMessage);
            this.renderMessages();
            this.scrollToBottom();
        }, 1000 + Math.random() * 2000);
    }

    handleKeyDown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.sendMessage();
        }
    }

    handleTyping() {
        // Simulate typing indicator
        this.typingUsers.add('أبونا يوحنا');
        document.getElementById('typingIndicator').innerHTML = this.renderTypingIndicator();
        
        setTimeout(() => {
            this.typingUsers.clear();
            document.getElementById('typingIndicator').innerHTML = '';
        }, 2000);
    }

    toggleReaction(messageId, emoji) {
        const roomMessages = this.messages.get(this.currentRoom);
        const message = roomMessages.find(m => m.id === messageId);
        
        if (message) {
            if (!message.reactions) message.reactions = {};
            
            if (message.reactions[emoji]) {
                message.reactions[emoji]++;
            } else {
                message.reactions[emoji] = 1;
            }
            
            this.renderMessages();
        }
    }

    toggleEmojiPicker() {
        // Simple emoji picker implementation
        const emojis = ['😊', '👍', '❤️', '🙏', '😢', '😂', '🤔', '👏', '🎉', '📚'];
        const messageInput = document.getElementById('messageInput');
        
        // Create emoji picker popup
        const emojiPicker = document.createElement('div');
        emojiPicker.style.cssText = `
            position: absolute;
            bottom: 70px;
            right: 60px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 0.5rem;
            z-index: 1000;
        `;
        
        emojis.forEach(emoji => {
            const emojiBtn = document.createElement('button');
            emojiBtn.textContent = emoji;
            emojiBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 5px;
                transition: background 0.2s ease;
            `;
            emojiBtn.onmouseover = () => emojiBtn.style.background = '#f7fafc';
            emojiBtn.onmouseout = () => emojiBtn.style.background = 'none';
            emojiBtn.onclick = () => {
                messageInput.value += emoji;
                document.body.removeChild(emojiPicker);
                messageInput.focus();
            };
            emojiPicker.appendChild(emojiBtn);
        });
        
        document.body.appendChild(emojiPicker);
        
        // Remove picker when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function removeEmojiPicker(e) {
                if (!emojiPicker.contains(e.target)) {
                    if (document.body.contains(emojiPicker)) {
                        document.body.removeChild(emojiPicker);
                    }
                    document.removeEventListener('click', removeEmojiPicker);
                }
            });
        }, 100);
    }

    // Utility Functions
    getUserColor(role) {
        const colors = {
            priest: '#48bb78',
            deacon: '#4299e1',
            member: '#9f7aea',
            moderator: '#ed8936'
        };
        return colors[role] || colors.member;
    }

    getRoleBadge(role) {
        const badges = {
            priest: '<span style="background: #48bb78; color: white; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.7rem;">كاهن</span>',
            deacon: '<span style="background: #4299e1; color: white; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.7rem;">شماس</span>',
            moderator: '<span style="background: #ed8936; color: white; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.7rem;">مشرف</span>',
            member: ''
        };
        return badges[role] || '';
    }

    formatTime(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'الآن';
        if (minutes < 60) return `منذ ${minutes} دقيقة`;
        if (hours < 24) return `منذ ${hours} ساعة`;
        if (days < 7) return `منذ ${days} يوم`;
        
        return timestamp.toLocaleDateString('ar-EG');
    }

    getOnlineUsersCount() {
        let count = 0;
        this.users.forEach(user => {
            if (user.status === 'online') count++;
        });
        return count;
    }

    getUnreadCount(roomId) {
        // Simulate unread messages
        return roomId === 'prayers' ? 2 : roomId === 'questions' ? 1 : 0;
    }

    scrollToBottom() {
        setTimeout(() => {
            const messagesContainer = document.getElementById('messagesContainer');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }, 100);
    }

    toggleRoomInfo() {
        const room = this.rooms.get(this.currentRoom);
        alert(`معلومات الغرفة:\n\nالاسم: ${room.name}\nالوصف: ${room.description}\nالمشرفون: ${room.moderators.join('، ')}`);
    }

    toggleNotifications() {
        alert('تم تفعيل الإشعارات لهذه الغرفة');
    }
}

// Add CSS animations
const chatStyles = document.createElement('style');
chatStyles.textContent = `
    @keyframes typing {
        0%, 60%, 100% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-10px);
        }
    }
    
    .chat-system * {
        box-sizing: border-box;
    }
    
    .chat-system .room-item:hover {
        background: rgba(255,255,255,0.1) !important;
    }
    
    .chat-system .message {
        animation: fadeInUp 0.3s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .chat-system textarea:focus {
        outline: none;
        border-color: #4299e1;
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
    }
    
    .chat-system button:hover {
        transform: translateY(-1px);
    }
    
    .chat-system .messages-container::-webkit-scrollbar {
        width: 6px;
    }
    
    .chat-system .messages-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }
    
    .chat-system .messages-container::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
    }
    
    .chat-system .messages-container::-webkit-scrollbar-thumb:hover {
        background: #a1a1a1;
    }
`;
document.head.appendChild(chatStyles);

// Initialize global chat system
window.copticChat = new CopticChatSystem();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('chatContainer')) {
        copticChat.renderChatInterface();
    }
});

console.log('🎉 نظام الشات التفاعلي للكنيسة القبطية الأرثوذكسية جاهز!');
