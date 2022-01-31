using System;
using System.Collections.Generic;

namespace Stack
{
    public class Stack
    {
        private readonly List<object> _stack = new List<object>();
        
        public void Push(object obj)
        {
            if (obj != null)
                _stack.Add(obj);
            else
                throw new InvalidOperationException("You cannot push null into the stack.");
        }

        public object Pop()
        {
            try
            {
                var lastItem = _stack[_stack.Count - 1];
                _stack.RemoveAt(_stack.Count - 1);
                return lastItem;
            }
            catch (Exception e)
            {
                throw new InvalidOperationException("Stack is empty. Nothing to pop off.");
            }
        }

        public void Clear()
        {
            _stack.Clear();
        }
    }
}